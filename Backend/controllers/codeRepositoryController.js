const mongoose = require('mongoose');
const crypto = require('crypto');
const { 
    getCodeRepositoryIdByProjectId,
    getAllCommitsByRepositoryId,
    updateCommitStatusByCommitId,
    createCommit
} = require('../services/codeRepositoryService')

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

        const commits = await getAllCommitsByRepositoryId(repoId);


        res.status(200).json({ success: true, commits });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateCommitStatus = async (req, res) => {
    try {
        const { commitId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(commitId)) {
            return res.status(404).json({ success: false, message: "Commit not found!" });
        }

        const { updatedStatus } = req.body;

        const updatedCommit = await updateCommitStatusByCommitId(commitId, updatedStatus);

        res.status(200).json({ success: true, updatedCommit });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const addCommit = async (req, res) => {
    try {
        const { repoId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(repoId)) {
            return res.status(404).json({ success: false, message: "Code Repository not found!" });
        }

        const { message, fileName, fileContent, status, userId } = req.body;
        const hash = crypto.createHash('sha256').update(fileContent).digest('hex');

        const commitData = {
            message,
            hash,
            fileName,
            fileContent,
            status: status || 'pending',
            userId,
            repositoryId: repoId
        };
        const newCommit = await createCommit(commitData);

        res.status(201).json({ success: true, newCommit });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {
    getCodeRepositoryId,
    getAllCommits,
    updateCommitStatus,
    addCommit
};