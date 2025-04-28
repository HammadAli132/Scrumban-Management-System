const { getProjectDetailsByProjectId,
    getProjectDetailsByUserId } = require("../services/projectService");

const getProjectDetails = async (req, res) => {
    try {
        const { projectId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ success: false, message: "No project found" });
        }

        const projectDetails = await getProjectDetailsByProjectId(projectId);

        res.status(200).json({ success: true, data: projectDetails });
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
    getUserProjectsDetails
}