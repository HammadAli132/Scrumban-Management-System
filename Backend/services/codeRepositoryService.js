const CodeRepository = require('../models/codeRepository');
const Commit = require('../models/commit');

const getCodeRepositoryIdByProjectId = async (projectId) => {
    try {
        const repository = await CodeRepository.findOne({ projectId: projectId });

        if (!repository) {
            throw new Error("Code repository not found for this project");
        }

        return repository._id;
    } catch (error) {
        throw new Error(`Error getting code repository ID: ${error.message}`);
    }
};

const getAllCommitsByRepositoryId = async (repoId) => {
    try {
        if (!repoId) {
            throw new Error("Repository ID is required");
        }

        // Get all commits for the repository, sorted by timestamp (newest first)
        const commits = await Commit.find({ repositoryId: repoId })
            .sort({ timestamp: -1 }); // -1 for descending (newest first)

        return commits;
    } catch (error) {
        throw new Error(`Error getting commits in repository: ${error.message}`);
    }
};

const updateCommitStatusByCommitId = async (commitId, updatedStatus) => {
    try {
        if (!commitId) {
            throw new Error("Commit ID is required");
        }

        if (updatedStatus == 'rejected') {
            const deletedCommit = await Commit.findByIdAndDelete(commitId);

            return deletedCommit;
        }

        const updatedCommit = await Commit.findByIdAndUpdate(
            {_id: commitId},
            { status: updatedStatus },
            { new: true }
        );

        return updatedCommit;
    } catch (error) {
        throw new Error(`Error updating commit status: ${error.message}`);
    }
};

module.exports = {
    getCodeRepositoryIdByProjectId,
    getAllCommitsByRepositoryId,
    updateCommitStatusByCommitId
}