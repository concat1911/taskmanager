//SETUP
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
//DATABASE
require('./db/mongoose');   
const USER = require('./db/models/user');
const TASK = require('./db/models/task');

app.use(express.json());

//===============================AUTHENTICATION===============================
//CREATE NEW USER
app.post('/auth/register', (req, res) => {
    const user = new USER(req.body);
    user.save()
        .then(() => {
            res.status(201).send(user)
        })
        .catch(err => {
            res.status(400).send(err)
        })
})
//GET ALL USER
app.get('/auth/users', (req, res) => {
    USER.find({}).then(users => {
        res.status(200).send(users);
    }).catch(err => {
        res.status(500).send(err)
    })
})
//FIND USER BY ID
app.get('/auth/user/:id', (req, res) => {
    const id = req.params.id;
    USER.findById(id).then((user) => {
        if(user){
            return res.status(200).send(user)
        }
        res.status(404) 
    }).catch(err => {
        res.status(500).send(err)
    })
})
//===============================TASKS CRUD===============================
app.post('/task/create', (req, res) => {
    const newTask = new TASK(req.body)

    newTask.save()
        .then(() => {
            res.status(201).send(newTask)
        })
        .catch(err => {
            res.status(400).send(err)
        })
})

//GET ALL TASK
app.get('/task/all', (req, res) => {
    TASK.find({}).then(tasks => {
        res.status(200).send(tasks);
    }).catch(err => {
        res.status(500).send(err)
    })
})
//FIND TASK BY ID
app.get('/task/:id', (req, res) => {
    const id = req.params.id;
    TASK.findById(id).then((task) => {
        if(task){
            return res.status(200).send(task)
        }
        res.status(404) 
    }).catch(err => {
        res.status(500).send(err)
    })
})

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON " + PORT)
})