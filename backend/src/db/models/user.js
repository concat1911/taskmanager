const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const TASK = require('../models/task');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

//GET PUBLIC PROFILE
userSchema.methods.toJSON = function() {
    const user = this;
    const profile = user.toObject();
    delete profile.password
    delete profile.tokens
    return profile;
}

//TOKEN GENERATOR
userSchema.methods.generateAuthToken = async function (){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'NOWOMANNOCRIME')
    user.tokens = [...user.tokens, {token}];

    await user.save()
    return token;
}

//CHECK EMAIL AND PASSWORD
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await USER.findOne({email})

    if(!user){
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user;
}

//HASH PASSWORD BEFORE SAVING
userSchema.pre('save', async function(next){
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    
    next();
})

//DELETE ALL USER'TASK WHEN USER ACCOUNT IS DELETED
userSchema.pre('remove', async function(next){
    const user = this;
    await TASK.deleteMany({owner: user._id})
    next()
})

const USER = mongoose.model('User', userSchema);

module.exports = USER;

