const express = require('express');
const keys = require('./config/keys')

//MONGODB CONNECT
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })

//MONGODB MODEL
require('./models/User')

//PASSPORT
require('./services/passport');


//AUTH ROUTES
const authRoutes = require('./routes/authRoutes');

const app = express();

authRoutes(app);
//another way: require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
