const mongoose = require('mongoose');
// const validator = require('validator');

const TASK = mongoose.model('Task', {
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
})
module.exports = TASK;