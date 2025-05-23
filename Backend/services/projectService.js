const Project = require('../models/project');
const ProjectCollaborator = require('../models/projectCollaborator');
const MeetingNote = require('../models/meetingNote');
const KanbanBoard = require('../models/kanbanBoard');
const CodeRepository = require('../models/codeRepository');
const KanbanBoardTask = require('../models/kanbanBoardTask');
const Commit = require('../models/commit');
const Comment = require('../models/comment');
const Sprint = require('../models/sprint');

const createProjectByUserId = async (userId, projectData) => {
    try {
        if (!userId) {
            throw new Error("User ID is required");
        }

        // Create the project
        const project = await Project.create({
            ...projectData,
            userId
        });

        // Create default Kanban board for the project
        const kanbanBoard = await KanbanBoard.create({
            title: `${projectData.title || 'Project'} Board`,
            projectId: project._id
        });

        // Create default code repository for the project
        const codeRepository = await CodeRepository.create({
            name: `${projectData.title || 'Project'} Repository`,
            projectId: project._id
        });

        return project;
    } catch (error) {
        throw new Error("Error getting project with collaborators: " + error.message);
    }
};

const getProjectDetailsByProjectId = async (projectId) => {
    try {
        const project = await Project.findById(projectId);

        if (!project) {
            throw new Error("Project not found");
        }

        // Get collaborators for this project
        const collaborators = await ProjectCollaborator.find({ projectId }).populate('userId', 'name username email image');

        // Get meeting notes for this project
        const meetingNotes = await MeetingNote.find({ projectId });

        // Populate the creator details
        await project.populate('userId', 'name username email image');

        return {
            project,
            collaborators,
            meetingNotes
        };
    } catch (error) {
        throw new Error("Error getting project with collaborators: " + error.message);
    }
};

const getProjectDetailsByUserId = async (userId) => {
    try {
        // 1. Get projects where user is the owner
        const ownedProjects = await Project.find({ userId }).populate('userId', 'username');

        // 2. Get projects where user is a collaborator
        const collaborationRecords = await ProjectCollaborator.find({ userId }).populate('userId', 'username');

        // Get the actual project documents for collaborated projects
        const collaboratedProjectIds = collaborationRecords.map(record => record.projectId._id);
        const collaboratedProjects = await Project.find({
            _id: { $in: collaboratedProjectIds }
        }).populate('userId', 'username');

        // 3. Combine both lists and remove duplicates
        const allProjects = [...ownedProjects, ...collaboratedProjects];
        const uniqueProjects = allProjects.filter(
            (project, index, self) => index === self.findIndex(p => p._id.toString() === project._id.toString())
        );

        // 4. Enrich each project with additional data
        const enrichedProjects = await Promise.all(
            uniqueProjects.map(async (project) => {
                // Get kanban board for the project
                const kanbanBoard = await KanbanBoard.findOne({ projectId: project._id });

                let taskCount = 0;
                let completedTaskCount = 0;

                if (kanbanBoard) {
                    // Get tasks count
                    taskCount = await KanbanBoardTask.countDocuments({
                        kanbanBoardId: kanbanBoard._id
                    });

                    // Get completed tasks count
                    completedTaskCount = await KanbanBoardTask.countDocuments({
                        kanbanBoardId: kanbanBoard._id,
                        swimLane: 'Done'
                    });
                }

                // Get collaborators count
                const collaboratorCount = await ProjectCollaborator.countDocuments({
                    projectId: project._id
                });

                return {
                    ...project.toObject(),
                    kanbanTaskCount: taskCount,
                    completedKanbanTaskCount: completedTaskCount,
                    collaboratorCount,
                    isOwner: project.userId._id.toString() === userId.toString()
                };
            })
        );

        return enrichedProjects;
    } catch (error) {
        throw new Error("Error getting user projects: " + error.message);
    }
};

const deleteProjectById = async (projectId) => {
    try {
        const project = await Project.findById(projectId);

        if (!project) {
            throw new Error("Project not found");
        }

        // delete kanban board as well as its tasks and comments related to them
        const kanbanBoard = await KanbanBoard.find({ projectId });
        const kanbanBoardTasks = await KanbanBoardTask.find({kanbanBoardId: kanbanBoard._id});
        const kanbanBoardTaskIds = kanbanBoardTasks.map(tasks => tasks._id);
        await Comment.deleteMany({kanbanBoardTaskId: { $in: kanbanBoardTaskIds }});
        await KanbanBoardTask.deleteMany({kanbanBoardId: kanbanBoard._id});

        await KanbanBoard.deleteOne({ projectId: project });

        //delete the code repository asscoiated with the project and its related commits
        const repo = await CodeRepository.findOne({ projectId: projectId });
        await Commit.deleteMany({ repositoryId: repo._id });
        await CodeRepository.deleteOne({ projectId: projectId });

        // delete all other related data
        await Promise.all([
            MeetingNote.deleteMany({ projectId }),
            Sprint.deleteMany({ projectId }),
            ProjectCollaborator.deleteMany({ projectId })
        ]);

        const deletedProject = await Project.findByIdAndDelete(projectId);

        return deletedProject;
    } catch (error) {
        throw new Error("Error deleting project: " + error.message);
    }
};

const checkIfUserIsOwner = async (projectId, userId) => {
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            throw new Error("Project not found");
        }

        const isOwner = project.userId.toString() === userId.toString();
        return isOwner;
    } catch (error) {
        console.log(error);
        
        throw new Error("Error checking project ownership: " + error.message);
    }
}

module.exports = {
    getProjectDetailsByProjectId,
    getProjectDetailsByUserId,
    createProjectByUserId,
    deleteProjectById,
    checkIfUserIsOwner
}