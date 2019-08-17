const mongoose = require('mongoose');
// const validator = require('validator');

const taskSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        minlength: 4,
        trim: true
    },
    description: {type: String, default: '', trim: true},
    completed: {type: Boolean, default: false},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }    
}, {
    timestamps: true
})
const TASK = mongoose.model('Task', taskSchema)
module.exports = TASK;