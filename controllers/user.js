const {response, request} = require('express');

const getUser = (req = request, res = response) =>{
    const {nombre, key = 10} = req.query;
    res.json({
        message: 'get api - controller',
        nombre, 
        key
    });
};
const postUser = (req, res = response) =>{
    const {nombre,edad} = req.body;

    res.json({
        message: 'post api - controller',
        nombre,
        edad
    });
}

const putUser = (req, res = response) =>{
    const {id} = req.params;
    res.json({
        message: 'post api - controller',
        id
    });
}

const deleteUser = (req, res = response) =>{
    const {id} = req.params;

    res.json({
        message: 'delete api - controller',
        id
    });
}

module.exports = {getUser, postUser, putUser, deleteUser};