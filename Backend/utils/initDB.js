const User = require("../models/user.js");
const ToDoList = require("../models/toDoList.js");
const ToDoListTask = require("../models/toDoListTask.js");
const Project = require("../models/project.js");
const KanbanBoard = require("../models/kanbanBoard.js");
const KanbanBoardTask = require("../models/kanbanBoardTask.js");
const Sprint = require("../models/sprint.js");
const CodeRepository = require("../models/codeRepository.js");
const Comment = require("../models/comment.js");
const MeetingNote = require('../models/meetingNote.js');
const ProjectCollaborator = require("../models/projectCollaborator.js");
const Commit = require('../models/commit.js');

const dummyUsers = [
    {
        name: 'John Doe',
        username: 'johndoe',
        password: 'password123',
        email: 'john.doe@example.com',
        image: 'https://example.com/images/johndoe.jpg'
    },
    {
        name: 'Jane Smith',
        username: 'janesmith',
        password: 'securepass456',
        email: 'jane.smith@example.com',
        image: 'https://example.com/images/janesmith.jpg'
    },
    {
        name: 'Alex Johnson',
        username: 'alexj',
        password: 'alexpass789',
        email: 'alex.johnson@example.com',
        image: 'https://example.com/images/alexj.jpg'
    },
    {
        name: 'Sarah Williams',
        username: 'sarahw',
        password: 'sarahpass321',
        email: 'sarah.williams@example.com',
        image: 'https://example.com/images/sarahw.jpg'
    },
    {
        name: 'Mike Brown',
        username: 'mikeb',
        password: 'mikepass654',
        email: 'mike.brown@example.com',
        image: 'https://example.com/images/mikeb.jpg'
    }
]

const dummyToDoTasks = [
    {
        title: "Complete project proposal",
        description: "Finish writing the project proposal document and submit it",
        priorityLevel: "high",
        dueDate: "2023-11-05",  // YYYY/MM/DD (formerly 05/11/2023)
        reminder: null,
        notes: "Check with team for any last-minute changes"
    },
    {
        title: "Buy groceries",
        description: "Milk, eggs, bread, fruits, and vegetables",
        priorityLevel: "medium",
        dueDate: "2023-11-03",   // YYYY/MM/DD (formerly 03/11/2023)
        notes: "Don't forget the organic options",
        reminder: "09:00"        // Time unchanged (HH:MM)
    },
    {
        title: "Schedule dentist appointment",
        description: "Call Dr. Smith's office to schedule checkup",
        priorityLevel: "low",
        dueDate: "2023-11-09",   // YYYY/MM/DD (formerly 09/11/2023)
        status: "completed",
        reminder: "14:30"        // Time unchanged
    },
    {
        title: "Prepare for meeting",
        description: "Review presentation slides and prepare talking points",
        priorityLevel: "high",
        dueDate: "2023-11-03",   // YYYY/MM/DD (formerly 03/11/2023)
        notes: "Focus on Q3 results and projections",
        reminder: "16:45"        // Time unchanged
    },
    {
        title: "Exercise",
        description: "30-minute run in the park",
        priorityLevel: "medium",
        dueDate: "2023-11-03",   // YYYY/MM/DD (formerly 03/11/2023)
        reminder: "07:30",       // Time unchanged
        inTrash: true
    }
];

const dummyProjects = [
    {
        title: "Website Redesign",
        description: "Complete overhaul of company website with modern design",
        startDate: "2023-11-01",
        endDate: "2023-12-15"
    },
    {
        title: "Mobile App Development",
        description: "Build cross-platform mobile application for iOS and Android",
        startDate: "2023-11-10",
        endDate: "2024-02-28"
    },
    {
        title: "Marketing Campaign",
        description: "Q4 promotional campaign for new product line",
        startDate: "2023-11-15",
        endDate: "2023-12-31"
    },
    {
        title: "Internal Tool Upgrade",
        description: "Update legacy systems to modern technologies",
        startDate: "2023-12-01",
        endDate: "2024-03-30"
    },
    {
        title: "Customer Portal",
        description: "Develop self-service portal for customers",
        startDate: "2024-01-01",
        endDate: "2024-04-30"
    }
];

const dummyKanbanBoards = [
    {
        title: "Website Redesign Tasks"
    },
    {
        title: "Mobile App Tasks"
    },
    {
        title: "Marketing Tasks"
    },
    {
        title: "Internal Tools Tasks"
    },
    {
        title: "Customer Portal Tasks"
    }
];

const dummyKanbanTasks = [
    {
        title: "Design homepage layout",
        description: "Create wireframes for the new homepage",
        priorityLevel: "high",
        dueDate: "2023-11-07",
        swimLane: "ToDo"
    },
    {
        title: "Implement user authentication",
        description: "Set up JWT authentication for the API",
        priorityLevel: "high",
        dueDate: "2023-11-12",
        swimLane: "ToDo"
    },
    {
        title: "Create social media content",
        description: "Design graphics for campaign launch",
        priorityLevel: "medium",
        dueDate: "2023-11-18",
        swimLane: "Doing"
    },
    {
        title: "Migrate database",
        description: "Move legacy data to new schema",
        priorityLevel: "medium",
        dueDate: "2023-12-05",
        swimLane: "Done"
    },
    {
        title: "Setup CI/CD pipeline",
        description: "Configure automated deployment",
        priorityLevel: "low",
        dueDate: "2024-01-10",
        swimLane: "Doing"
    }
];

const dummySprints = [
    {
        title: "Sprint 1 - Foundation",
        startDate: "2023-11-01",
        endDate: "2023-11-14",
        retrospective: "Initial setup went well, need more design assets"
    },
    {
        title: "Sprint 2 - Core Features",
        startDate: "2023-11-15",
        endDate: "2023-11-28",
        retrospective: "Backend completed ahead of schedule"
    },
    {
        title: "Sprint 3 - UI Polish",
        startDate: "2023-11-29",
        endDate: "2023-12-12",
        retrospective: "Need more testing resources"
    },
    {
        title: "Sprint 4 - Final Touches",
        startDate: "2023-12-13",
        endDate: "2023-12-26",
        retrospective: "Ready for launch"
    },
    {
        title: "Sprint 1 - Planning",
        startDate: "2024-01-01",
        endDate: "2024-01-14",
        retrospective: "Requirements finalized"
    }
];

const dummyCodeRepositories = [
    {
        name: "website-redesign"
    },
    {
        name: "mobile-app-dev"
    },
    {
        name: "marketing-campaign"
    },
    {
        name: "internal-tools"
    },
    {
        name: "customer-portal"
    }
];

const dummyComments = [
    {
        text: "This task is blocked until we get the design assets from the team."
    },
    {
        text: "I've completed the backend part, frontend integration needed."
    },
    {
        text: "Need clarification on the color scheme for this component."
    },
    {
        text: "This is ready for QA testing."
    },
    {
        text: "Deployment completed successfully to staging environment."
    },
    {
        text: "Found a small bug in the authentication flow, working on fix."
    },
    {
        text: "Approved and merged to main branch."
    },
    {
        text: "Need more details about the API requirements."
    },
    {
        text: "This is now unblocked and ready for development."
    },
    {
        text: "Client requested some changes, see email for details."
    }
];

const dummyMeetingNotes = [
    {
        title: "Kickoff Meeting Notes",
        content: "Discussed project scope, timelines, and deliverables. Team assigned roles and responsibilities. Next meeting scheduled for Friday."
    },
    {
        title: "Design Review",
        content: "Reviewed initial wireframes. Feedback: simplify navigation, increase contrast for accessibility. Action items: update mockups by next week."
    },
    {
        title: "Sprint Planning",
        content: "Prioritized backlog items for Sprint 2. Estimated 35 story points. Focus on authentication module and dashboard components."
    },
    {
        title: "Client Feedback Session",
        content: "Client likes overall direction but requested changes to color scheme. Need to adjust primary color to match brand guidelines."
    },
    {
        title: "Retrospective Meeting",
        content: "What went well: good collaboration. Improvements needed: better estimation. Action items: implement pair programming for complex tasks."
    },
    {
        title: "Technical Discussion",
        content: "Decided to use React for frontend and Node.js for backend. Database choice: MongoDB. Need to finalize API specs."
    },
    {
        title: "QA Status Update",
        content: "Current test coverage at 75%. Critical bugs found in checkout flow. Developers to prioritize fixes this sprint."
    },
    {
        title: "Deployment Planning",
        content: "Scheduled production deployment for next Tuesday at 2AM. Rollback plan in place. All teams on standby."
    },
    {
        title: "Budget Review",
        content: "Currently at 65% of allocated budget. On track to complete within estimates. No additional resources needed."
    },
    {
        title: "Post-Mortem",
        content: "Project completed successfully. Key learnings: better communication needed between teams. Documentation to be finalized this week."
    }
];

const dummyCommits = [
    {
        message: "Initial project setup",
        hash: "a1b2c3d4e5f6g7h8i9j0",
        fileName: "package.json",
        fileContent: JSON.stringify({
            name: "project",
            version: "1.0.0",
            dependencies: {
                "express": "^4.18.2",
                "mongoose": "^7.0.0"
            }
        }, null, 2),
        status: "approved"
    },
    {
        message: "Add user authentication",
        hash: "b2c3d4e5f6g7h8i9j0k1",
        fileName: "authController.js",
        fileContent: "const express = require('express');\nconst router = express.Router();\n\n// Authentication routes here",
        status: "approved"
    },
    {
        message: "Fix login bug",
        hash: "c3d4e5f6g7h8i9j0k1l2",
        fileName: "authService.js",
        fileContent: "function login(username, password) {\n  // Fixed login logic here\n}",
        status: "pending"
    },
    {
        message: "Update homepage design",
        hash: "d4e5f6g7h8i9j0k1l2m3",
        fileName: "HomePage.jsx",
        fileContent: "import React from 'react';\n\nexport default function HomePage() {\n  return <div>New Design</div>\n}",
        status: "approved"
    },
    {
        message: "Refactor API endpoints",
        hash: "e5f6g7h8i9j0k1l2m3n4",
        fileName: "api.js",
        fileContent: "// Refactored API routes here",
        status: "pending"
    },
    {
        message: "Add database migration",
        hash: "f6g7h8i9j0k1l2m3n4o5",
        fileName: "001-initial.js",
        fileContent: "// Initial database migration",
        status: "approved"
    },
    {
        message: "Implement search functionality",
        hash: "g7h8i9j0k1l2m3n4o5p6",
        fileName: "searchService.js",
        fileContent: "function search(query) {\n  // Search implementation\n}",
        status: "pending"
    },
    {
        message: "Update documentation",
        hash: "h8i9j0k1l2m3n4o5p6q7",
        fileName: "README.md",
        fileContent: "# Project\n\nUpdated documentation here",
        status: "approved"
    },
    {
        message: "Fix responsive layout issues",
        hash: "i9j0k1l2m3n4o5p6q7r8",
        fileName: "styles.css",
        fileContent: ".container {\n  max-width: 100%;\n}",
        status: "approved"
    },
    {
        message: "Add unit tests",
        hash: "j0k1l2m3n4o5p6q7r8s9",
        fileName: "user.test.js",
        fileContent: "describe('User tests', () => {\n  // Test cases here\n})",
        status: "pending"
    }
];

async function initDB() {
    try {
        // clear existing data first 
        await User.deleteMany({});
        await ToDoListTask.deleteMany({});
        await ToDoList.deleteMany({});
        await KanbanBoard.deleteMany({});
        await KanbanBoardTask.deleteMany({});
        await Sprint.deleteMany({});
        await Project.deleteMany({});
        await CodeRepository.deleteMany({});
        await Comment.deleteMany({});
        await MeetingNote.deleteMany({});
        await ProjectCollaborator.deleteMany({});
        await Commit.deleteMany({});

        // creating dummy users
        const users = await User.insertMany(dummyUsers);
        // console.log('Users created successfully:', users);

        // creating todo list for each user
        const todoLists = [];
        for (const user of users) {
            const todoList = await ToDoList.create({ userId: user._id });
            todoLists.push(todoList);
        }
        // console.log('Todo lists created successfully', todoLists);

        // creating tasks for each todo list
        const tasks = [];
        for (let i = 0; i < todoLists.length; i++) {
            const todoList = todoLists[i];
            
            // Create a task for each todo list
            const taskData = {
                ...dummyToDoTasks[i],
                toDoListId: todoList._id
            };
            
            const task = await ToDoListTask.create(taskData);
            tasks.push(task);
        }
        // console.log('Tasks created successfully', tasks);

        // creating projects for each user
        const projects = [];
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const projectData = {
                ...dummyProjects[i],
                userId: user._id
            };
            const project = await Project.create(projectData);
            projects.push(project);
        }
        // console.log('Projects created successfully', projects);

        // creating code repositories for each project
        const codeRepositories = [];
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            const repoData = {
                ...dummyCodeRepositories[i],
                projectId: project._id
            };
            const repository = await CodeRepository.create(repoData);
            codeRepositories.push(repository);
        }
        // console.log('Code Repositories added successfully', codeRepositories);

        // creating kanban boards for each project
        const kanbanBoards = [];
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            const kanbanBoardData = {
                ...dummyKanbanBoards[i],
                projectId: project._id
            };
            const kanbanBoard = await KanbanBoard.create(kanbanBoardData);
            kanbanBoards.push(kanbanBoard);
        }
        // console.log('Kanban Boards created successfully', kanbanBoards);

        // creating sprints for each project
        const sprints = [];
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            const sprintData = {
                ...dummySprints[i],
                projectId: project._id
            };
            const sprint = await Sprint.create(sprintData);
            sprints.push(sprint);
        }
        // console.log('Sprints for projects added successfully', sprints);

        // creating kanban tasks for each kanban board
        const kanbanTasks = [];
        for (let i = 0; i < kanbanBoards.length; i++) {
            const kanbanBoard = kanbanBoards[i];
            const user = users[i];
            const sprint = sprints[i];
            
            const kanbanTaskData = {
                ...dummyKanbanTasks[i],
                kanbanBoardId: kanbanBoard._id,
                userId: user._id,
                sprintId: sprint._id
            };
            
            const kanbanTask = await KanbanBoardTask.create(kanbanTaskData);
            kanbanTasks.push(kanbanTask);
        }
        // console.log('Kanban Board Tasks added successfully', kanbanTasks);

         // creating comments for kanban tasks
         const comments = [];
         for (let i = 0; i < kanbanTasks.length; i++) {
             // Each task gets 2 comments
             for (let j = 0; j < 2; j++) {
                 const commentIndex = i * 2 + j;
                 const kanbanTask = kanbanTasks[i];
                 const user = users[i]; // Using the same user for simplicity
                 
                 const commentData = {
                     ...dummyComments[commentIndex],
                     userId: user._id,
                     kanbanBoardTaskId: kanbanTask._id
                 };
         
                 const comment = await Comment.create(commentData);
                 comments.push(comment);
             }
         }
        // console.log('Comments to kanban board tasks added successfully', comments);

        // creating meeting notes for projects
        const meetingNotes = [];
        for (let i = 0; i < projects.length; i++) {
            // Each project gets 2 meeting notes
            for (let j = 0; j < 2; j++) {
                const noteIndex = i * 2 + j;
                const project = projects[i];
                
                const noteData = {
                    ...dummyMeetingNotes[noteIndex],
                    projectId: project._id
                };
                
                const meetingNote = await MeetingNote.create(noteData);
                meetingNotes.push(meetingNote);
            }
        };
        // console.log('Meeting Notes added successfully', meetingNotes);

        // creating project collaborators (1 per project)
        const projectCollaborators = [];
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            // Get a different user than the project creator to be the collaborator
            const collaboratorIndex = (i + 1) % users.length;
            const collaborator = users[collaboratorIndex];
            
            const collaboratorData = {
                userId: collaborator._id,
                projectId: project._id
            };
            
            const projectCollaborator = await ProjectCollaborator.create(collaboratorData);
            projectCollaborators.push(projectCollaborator);
        }
        // console.log('Project collaborators added successfully', projectCollaborators);

        // creating commits for code repositories
        const commits = [];
        for (let i = 0; i < codeRepositories.length; i++) {
            // Each repository gets 2 commits
            for (let j = 0; j < 2; j++) {
                const commitIndex = i * 2 + j;
                const repository = codeRepositories[i];
                const user = users[i];
                
                const commitData = {
                    message: dummyCommits[commitIndex].message,
                    hash: dummyCommits[commitIndex].hash,
                    fileName: dummyCommits[commitIndex].fileName,
                    fileContent: dummyCommits[commitIndex].fileContent,
                    status: dummyCommits[commitIndex].status,
                    userId: user._id,
                    repositoryId: repository._id
                };

                const commit = await Commit.create(commitData);
                commits.push(commit);
            }
        }

        // console.log('Commits added successfully', commits);
    } catch (error) {
        console.error('Error during database initialization:', error);
        throw error;
    }
};

module.exports = { initDB };