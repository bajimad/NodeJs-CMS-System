const mongoose =require('mongoose');

const userSchema =new mongoose.Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roles'
    },
    first_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40
    },
    last_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 99
    }
});

const User =mongoose.model('users', userSchema);

module.exports ={
    User
};