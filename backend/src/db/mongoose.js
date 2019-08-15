const mongoose = require('mongoose');
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


// const me = new USER({name: 'linh', email: 'nhatlinhtr95@'})
// me.save().then(res => console.log("new user: " + me)).catch(err => console.log(err))