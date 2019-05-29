const express = require('express');

//MONGODB CONNECT
const mongoose = require('mongoose');

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
