//SETUP
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.post('/auth/register', (req, res) => {
    res.send("Hi there")
})