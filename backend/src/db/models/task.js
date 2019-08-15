const mongoose = require('mongoose');
const validator = require('validator');

const TASK = mongoose.model('Task', {
    title: {
        type: String, 
        required: true,
        minlength: 4,
        trim: true
    },
    description: {type: String, default: ''},
    completed: {type: Boolean, default: false}
})
module.exports = TASK;