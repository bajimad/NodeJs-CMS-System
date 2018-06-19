const mongoose =require('mongoose');

const postSchema =new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }, 
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 120
    },
    body: {
        type: String,
        required: true,
        minlength: 3
    },
    status: {
        type: String,
        default: 'public'
    },
    allow_comments: {
        type: Boolean,
        default: false
    },
    file: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Post =mongoose.model('posts', postSchema);

module.exports ={
    Post
};