const { request, response } = require("express");


const adminRole = (req = request, res = response, next) =>{
    if(!req.user) return res.status(500).json({msg: 'error validate JWT'});
    const {role, name} = req.user;
    if(role !== 'ADMIN_ROLE') return res.status(401).json({msg: 'user is not admin'});
    next();
}
const hasRole = (...roles) =>{
    return (req = request, res = response, next) =>{
        if(!req.user) return res.status(500).json({msg: 'error validate JWT'});
        if(!roles.includes(req.user.role)) return res.status(401).json({msg: `service requires a role: ${roles}`});

        next();
    }
}

module.exports = {adminRole, hasRole};