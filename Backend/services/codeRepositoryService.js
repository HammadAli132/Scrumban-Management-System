const CodeRepository = require('../models/codeRepository');

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

model.exports = {
    getCodeRepositoryIdByProjectId
}