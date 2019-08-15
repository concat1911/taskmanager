const mongoose = require('mongoose');
const validator = require('validator');
//const {connectURL} = require('./database')
const connectURL = 'mongodb+srv://linh:onlyme2511@cluster-eb3gs.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(
    connectURL,
    {
        useNewUrlParser: true,
        useCreateIndex: true    
    }
).then(res => {
    console.log("DATABASE CONNECTED")
}).catch(err => {
    console.log(err)
})

const USER = mongoose.model('User', {
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase.includes(value)){
                throw new Error('Email is invalid');
            }
        }
    }
})

const TASK = mongoose.model('Task', {
    title: {
        type: String, 
        required: true,
        minlength: 4,
        trim: true
    },
    description: {type: String},
    completed: {type: Boolean, default: false}
})

// const me = new USER({name: 'linh', email: 'nhatlinhtr95@'})
// me.save().then(res => console.log("new user: " + me)).catch(err => console.log(err))