const {request, response} = require('express');
const bcryptjs = require('bcryptjs');

const {generateJWT} = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');
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
const googleSingIn = async (req = request, res = response) => {
    const {id_token} = req.body;

    try {
        const {name, picture, email} = await googleVerify(id_token);
        let user = await User.findOne({email});
        if(!user) {
            const data = {
                name,
                img: picture,
                email,
                password: ':)',
                google: true,
                role: 'USER_ROLE'
            }

            user = new User(data);

            await user.save();
        }

        if(!user.status) return res.status(401).json({msg: 'contact support, the user is blocked'});
        
        const token = await generateJWT(user.id);
        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "Invalid Google Token"
        });
    }
}

module.exports = {login, googleSingIn};