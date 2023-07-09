const {Schema, model} = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'name is required ']
    },
    email:{
        type: String,
        unique:[ true,'email already exists'],
        required: [true, 'email is required ']
    },
    password:{
        type: String,
        required: [true, 'password is required ']
    },
    emg: {
        type: String
    },
    role: {
        type:String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function(){
    const {__v, password, ...user} = this.toObject();
    return user;
};

module.exports = model('User', userSchema);