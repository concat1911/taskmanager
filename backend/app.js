const express = require('express');

//GOOGLE LOGIN OAUTH STRATEGY
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
passport.use(new GoogleStrategy());

//Index Route
app.get('/', (req, res) => {
    res.send({homepage: ''});
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
