const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
     userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          unique: true
      },
     level : {
          type: Number,
          required: true
     },
     questions : {
          type: [Object],
          required: true
     },
     answers : {
          type: [Number],
          required: true
     },
     scores : {
          type: [Number],
          required: true   
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

module.exports = mongoose.model('Question', questionSchema) 



















