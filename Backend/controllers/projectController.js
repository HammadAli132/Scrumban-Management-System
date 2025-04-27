const { getProjectDetailsByProjectId } = require("../services/projectService");

const getProjectDetails = async (req, res) => {
    try {
        const { projectId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({success: false, message: "No project found"});
        }

        const projectDetails = await getProjectDetailsByProjectId(projectId);

        res.status(200).json({success: true, data: projectDetails});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};

module.exports = {
    getProjectDetails
}