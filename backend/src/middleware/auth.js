const jwt = require('jsonwebtoken')
const USER = require('../db/models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'NOWOMANNOCRIME')
        const user = await USER.findOne({_id: decoded._id, 'tokens.token': token})
        if(!user){
            throw new Error()
        }
        req.token = token;
        req.user = user; 
        next()
    } catch (error) {
        res.status(401).send({error: 'Please authenticate.'})
    }
}

module.exports = auth;