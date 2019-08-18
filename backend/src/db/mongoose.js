const mongoose = require('mongoose');
const {mongoURL} = require('../secrets');

mongoose.connect(
    // process.env.MONGGO_DB_URL ? process.env.MONGGO_DB_URL : connectURL,
    mongoURL,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
    }
).then(res => {
    console.log("DATABASE CONNECTED")
}).catch(err => {
    console.log(err)
})
