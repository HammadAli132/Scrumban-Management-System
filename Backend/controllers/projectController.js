const { getProjectDetailsByProjectId,
        getProjectDetailsByUserId, 
        createProjectByUserId} = require("../services/projectService");

const createProject = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const newProject = await createProjectByUserId(userId);

        res.status(200).json({ success: true, project: newProject });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getProjectDetails = async (req, res) => {
    try {
        const { projectId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ success: false, message: "No project found" });
        }

        const projectDetails = await getProjectDetailsByProjectId(projectId);

        res.status(200).json({ success: true, project: projectDetails });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// returns detail of projects that the user created and the projects they are associated with as well
const getUserProjectsDetails = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "No User found" });
        }

        const userProjects = await getProjectDetailsByUserId(userId);

        res.status(200).json({ success: true, data: userProjects });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getProjectDetails,
    getUserProjectsDetails,
    createProject
}