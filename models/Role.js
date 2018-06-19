const mongoose =require('mongoose');

const roleSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 60
    }
});

const Role =mongoose.model('roles', roleSchema);

module.exports ={
    Role
};