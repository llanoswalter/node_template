const Role = require('../models/role');
const User = require('../models/user');


const isValidRole = async (role = '') => {
    const mailExist = await Role.findOne({ role });
    if (!mailExist) throw new Error("Not Allowed role");
}

const mailExist = async (email = '') => {
    const mailExist = await User.findOne({ email });
    if (mailExist) throw new Error('mail already exists');
};

const userExistById = async (id) => {
    const userExist = await User.findById(id);
    if (!userExist) throw new Error(`The user with the ${id} does not exist `);
};

module.exports = { isValidRole, mailExist, userExistById };