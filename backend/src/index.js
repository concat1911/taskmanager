//SETUP
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

//DATABASE
require('./db/mongoose');   

//ROUTER
const userRouter = require('./router/user');
const taskRouter = require('./router/task')

//SERVER
app.use(express.json());
app.use(cors())
app.use(userRouter)
app.use(taskRouter)

//===========================APP LISTENER========================
app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON " + PORT)
})