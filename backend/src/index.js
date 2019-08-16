//SETUP
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const isDownForMaintain = false;

//DATABASE
require('./db/mongoose');   

//ROUTER
const userRouter = require('./router/user');
const taskRouter = require('./router/task')

//SERVER | MIDDLEWARE
app.use((req, res, next) => {
    if(isDownForMaintain){
        return res.status(500).send('SERVER IS DOWN FOR MAINTAINCE')
    }else{
        next();
    }
})
app.use(express.json());
app.use(cors())
app.use(userRouter)
app.use(taskRouter)

//===========================APP LISTENER========================
app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON " + PORT)
})