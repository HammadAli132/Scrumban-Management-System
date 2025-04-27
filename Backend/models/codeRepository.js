const mongoose = require('mongoose');

const codeRepositorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project",
        required: true
    }
}, {timestamps: true});

const CodeRepository = mongoose.model('CodeRepository', codeRepositorySchema);

module.exports = CodeRepository;