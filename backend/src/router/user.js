const express = require('express');
const router = new express.Router();
const USER = require('../db/models/user');
const auth = require('../middleware/auth');

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