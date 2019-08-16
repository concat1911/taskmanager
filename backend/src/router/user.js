const express = require('express');
const router = new express.Router();
const USER = require('../db/models/user');

//===============================AUTHENTICATION===============================
//CREATE NEW USER
router.post('/auth/register', async (req, res) => {
    const user = new USER(req.body);
    try{
        await user.save()
        res.status(201).send(user)
    }catch(err){
        res.status(400).send(err)
    }
})
//GET ALL USER
router.get('/auth/users', async (req, res) => {
    try{
        const users = await USER.find({})
        res.status(200).send(users);
    }catch(err){
        res.status(500).send(err)
    }
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
router.patch('/user/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowUpdates = ['name', 'email', 'password']
    const isValidOperator = updates.every((update) => allowUpdates.includes(update))
    const id = req.params.id;

    if(!id || !isValidOperator) return res.status(400).send('[ERROR]: Invalid updates')
    try {
        const user = await USER.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
        if(user) res.status(201).send(user);
        return res.status(404).send();
    } catch (error) {
        res.status(400).send(error)
    }
})
//DELETE USER
router.delete('/user/:id', async (req, res) => {
    const id = req.params.id;
    if(!id) return res.status(404).send("ID NOT VALID OR EMPTY");

    try {
        const user = await USER.findByIdAndDelete(id)
        if(user) return res.send(user);
        return res.status(404).send('USER NOT FOUND')
    } catch (error) {
        return res.status(500).send(error);   
    }
})
module.exports = router;