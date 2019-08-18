const express = require('express');
const router = new express.Router();
const USER = require('../db/models/user');
const auth = require('../middleware/auth');
const multer = require('multer')
const sharp = require('sharp')

//===============================AUTHENTICATION===============================
//CREATE NEW USER
router.post('/auth/register', async (req, res) => {
    const user = new USER(req.body);
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch(err){
        res.status(400).send(err)
    }
})
//USER LOGIN
router.post('/auth/login', async (req, res) => {
    try {
        const user = await USER.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
})
//USER LOGOUT
router.post('/auth/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })

        await req.user.save()
        res.status(200).send("logout sucessfully")
    } catch (error) {
        res.status(500).send();
    }
})

//USER LOGOUT ALL
router.post('/auth/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send("logout all successfully")
    } catch (error) {
        res.status(500).send();
    }
})
//GET ALL USER
router.get('/auth/users',auth, async (req, res) => {
    try{
        const users = await USER.find({})
        res.status(200).send(users);
    }catch(err){
        res.status(500).send(err)
    }
})

//GET PROFILE
router.get('/auth/me',auth, async (req, res) => {
    res.send(req.user)
})

//FIND USER BY ID
router.get('/auth/user/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await USER.findById(id)
        if(user) return res.status(200).send(user)
        res.status(404) 
    }catch(err){
        res.status(500).send(err)
    }
})
//UPDATE USER
router.patch('/user/me', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowUpdates = ['name', 'email', 'password']
    const isValidOperator = updates.every((update) => allowUpdates.includes(update))

    if(!isValidOperator) return res.status(400).send('[ERROR]: Invalid updates')
    try {
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save();
        res.status(201).send(req.user); 
    } catch (error) {
        res.status(400).send(error)
    }
})
//AVATAR
var upload = multer({ 
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})

router.post('/user/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 300, height: 300}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})
//GET AVATAR
router.get('/user/:id/avatar', async (req, res) => {
    try {
        const user = await USER.findById(req.params.id);
        if(user){
            res.set('Content-Type', 'image/png')
            res.send(user.avatar)
        }
        throw new Error()
    } catch (error) {
        res.status(404).send()
    }
})
//DELETE AVATAR
router.delete('/user/avatar', auth, async(req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send()
})
//DELETE USER
router.delete('/user/deleteme', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        return res.status(500).send(error);   
    }
})
module.exports = router;