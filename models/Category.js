const mongoose =require('mongoose');

const categorySchema =new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 60
    }
});

const Category =mongoose.model('categories', categorySchema);

module.exports ={
    Category
};