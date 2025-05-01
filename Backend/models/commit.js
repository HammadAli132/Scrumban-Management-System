const mongoose = require('mongoose');

const commitSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        trim: true
    },
    hash: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    fileName: {
        type: String,
        required: true,
        trim: true
    },
    fileContent: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['approved', 'pending', 'rejected'],
        default: 'pending',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true
    },
    repositoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CodeRepository',
        required: true
    }
}, {timestamps: true});

const Commit = mongoose.model('Commit', commitSchema);

module.exports = Commit;