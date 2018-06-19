const mongoose =require('mongoose');

const commentSchema =new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    },
    body: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 2000
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Comment =mongoose.model('comments', commentSchema);

module.exports ={
    Comment
};