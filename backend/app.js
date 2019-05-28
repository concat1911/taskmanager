const express = require('express');

const app = express();

//Middleware: How it works
// app.use(function(req, res, next){
//     req.name = "Linh Tinh";
//     next();
// });

//Index Route
app.get('/', (req, res) => {
    res.send({index: 'Welcome'});
})

//About
app.get('/about', (req, res) => {
    res.send('About');
})


const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});

//App Request: post, get, delete, patch, put