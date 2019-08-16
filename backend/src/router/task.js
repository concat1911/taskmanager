const express = require('express');
const router = new express.Router();
const TASK = require('../db/models/task');
const auth = require('../middleware/auth');

//===============================TASKS CRUD===============================
//CREATE NEW TASK
router.post('/task/create', auth, async(req, res) => {
    const newTask = new TASK({
        ...req.body,
        owner: req.user._id
    })

    try{
        await newTask.save()
        res.status(201).send(newTask)
    }catch(err){
        res.status(400).send(err)
    }
})

//GET ALL TASK
router.get('/task/all', auth, async(req, res) => {
    try{
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    }catch(err){
        res.status(500).send(err)
    }
})

//FIND TASK BY ID
router.get('/task/:id', auth, async (req, res) => {
    const id = req.params.id;
    const task = await TASK.findOne({id, owner: req.user._id })

    try {
        const task = await TASK.findById(id)
        if(task){
            return res.status(200).send(task)
        }
        res.status(404) 
    } catch (error) {
        res.status(500).send(error)
    }
})
//UPDATE TASK BY ID
router.patch('/task/:id', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowUpdates = ['title', 'description', 'completed']
    const isValidOperator = updates.every((update) => allowUpdates.includes(update))
    const id = req.params.id;

    if(!id || !isValidOperator) return res.status(400).send('[ERROR]: Invalid updates')
    try {
        // const task = await TASK .findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
        const task = await TASK.findOne({_id: id, owner: req.user._id})
        updates.forEach(update => task[update] = req.body[update])
        await task.save();
        
        if(task) res.status(201).send(task);
        return res.status(404).send();
    } catch (error) {
        res.status(400).send(error)
    }
})
//DELETE TASK BY ID
router.delete('/task/:id', auth, async (req, res) => {
    const id = req.params.id;
    if(!id) return res.status(404).send("ID NOT VALID OR EMPTY");

    try {
        const task = await TASK.findOneAndDelete({_id: id, owner: req.user._id})
        if(task) return res.send(task);
        return res.status(404).send('TASK NOT FOUND')
    } catch (error) {
        return res.status(500).send(error);   
    }
})

module.exports = router;