const { getCodeRepositoryIdByProjectId,
        getAllCommitsByRepositoryId} = require('../services/codeRepositoryService')

const getCodeRepositoryId = async (req, res) => {
    try {
        const { projectId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(404).json({ success: false, message: "Project not found!" });
        }

        const codeRepositoryId = await getCodeRepositoryIdByProjectId(projectId);

        res.status(200).json({ success: true, codeRepositoryId });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getAllCommits = async (req, res) => {
    try {
        const { repoId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(repoId)) {
            return res.status(404).json({ success: false, message: "Code Repository not found!" });
        }

        const commits = getAllCommitsByRepositoryId(repoId);

        res.status(200).json({ success: true, commits });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {
    getCodeRepositoryId,
    getAllCommits
};