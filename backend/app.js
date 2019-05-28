const express = require('express');

const app = express();
const port = 5000;

//Index Route
app.get('/', (req, res) => {
    res.send('INDEX');
})

//About
app.get('/about', (req, res) => {
    res.send('About');
})

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});