const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUser = async (req = request, res = response) =>{
    const {limit = 5, skip = 0} = req.query;
    const status = true;
    
    const [total, users]  = await Promise.all([
        User.countDocuments({status}),
        User.find({status})
            .limit(Number( limit))
            .skip(Number( skip))
    ]);

    res.json({
        total,
        users
    });
};  
const postUser = async (req, res = response) =>{

    const {name, email, password, role} = req.body;
    const user = new User({name, email, role});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    
    await user.save();
    res.json({
        user
    });
}

const putUser = async (req, res = response) =>{
    const {id} = req.params;
    const {_id, password, google, email, ...body} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync(password, salt); 
    }

    const user = await User.findByIdAndUpdate(id, body);

    res.json({
        user
    });
}

const deleteUser = async (req, res = response) =>{
    const {id} = req.params;

    const user = await User.findByIdAndUpdate(id, {status : false});
    res.json({
        user
    });
}

module.exports = {getUser, postUser, putUser, deleteUser};