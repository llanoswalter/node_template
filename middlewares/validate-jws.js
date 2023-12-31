const jwt = require('jsonwebtoken');
const {request, response} = require('express');

const User = require('../models/user');


const validateJWT = async (req = request, res = response, next)=>{
    const token = req.header('x-token');
    if(!token) return res.status(401).json({msg: 'missing token in the request '});

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);

        if(!user) return res.status(401).json({msg: 'Invalid token'});
        if(!user.status) return res.status(401).json({msg: 'Invalid token'});

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({msg: 'Invalid token'});
    }
}

module.exports = {validateJWT};