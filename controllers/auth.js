const {request, response} = require('express');
const bcryptjs = require('bcryptjs');

const {generateJWT} = require('../helpers/generate-jwt');
const User = require('../models/user');

const login = async (req = request, res = response) =>{
    const {email, password} =  req.body;

    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg: 'user / password is invalid'});
        if(!user.status) return res.status(400).json({msg: 'user / password is invalid'});
        
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword) return res.status(400).json({msg: 'user / password is invalid'});

        const token = await generateJWT(user.id);
        console.log(token);
        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'up! something went wrong ',
        })
    }
}

module.exports = {login};