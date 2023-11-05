const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true
    },
    highestLvl: {
        type: Number,
        required: true,
    },
    finalScore: {
        type: Number,
        required: true,
    },
    scores: {
        type: [Number],
        required: true,
    },
    createdAt: { 
        type: String,
        default: new Date().toLocaleString()
    },
    updatedAt: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Score', scoreSchema) 

