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
        const repositoryId = repoId.toString();
        
        // Check if the repository exists
        const repository = await CodeRepository.findById(repositoryId);
        if (!repository) {
            throw new Error("Code repository not found");
        }
        
        // Get all commits for the repository, sorted by timestamp (newest first)
        const commits = await Commit.find({ repositoryId })
            .populate('userId', 'name username')
            .sort({ createdAt: -1 }); // -1 for descending (newest first)


        

        return commits;
    } catch (error) {
        throw new Error(`Error getting commits in repository: ${error.message}`);
    }
};

const updateCommitStatusByCommitId = async (commitId, updatedStatus) => {
    try {
        if (!commitId || !updatedStatus) {
            throw new Error("Commit ID and Updated Status both are required");
        }

        if (updatedStatus == 'rejected') {
            const deletedCommit = await Commit.findByIdAndDelete(commitId);

            return deletedCommit;
        }

        const updatedCommit = await Commit.findByIdAndUpdate(
            commitId,
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