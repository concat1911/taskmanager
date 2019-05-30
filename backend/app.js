const express = require('express');
const keys = require('./config/keys')

//COOKIE
const cookieSession = require('cookie-session');

//MONGODB CONNECT
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })

//MONGODB MODEL
require('./models/User')

//PASSPORT
const passport = require('passport');
require('./services/passport');


//AUTH ROUTES
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000, //30 days
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
//another way: require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
