const { Post } =require('../models/Post');
const { Comment } =require('../models/Comment');
const { User } =require('../models/User');


/// All Comments Page
exports.allCommentsPage =(request, response) => {

    Comment.find()
        .then(comments => {
            response.render('admin/comments/index', {
                comments: comments
            });
        })
        .catch(err => {
            console.log(err);
        });

}

/// Create Comments Page
exports.createCommentsPage =(request, response) => {

    User.find()
        .then(users => {

            Post.find()
                .then(posts => {

                    response.render('admin/comments/create', {
                        users: users,
                        posts: posts
                    });

                })
                .catch(err => {
                    console.log(err);
                });

        })
        .catch(err => {
            console.log(err);
        });

    

}

/// Create Comment
exports.createComment =(request, response) => {

    let errors =[];

    if(!request.body.user){
        errors.push({message: 'Provide User'});
    }
    if(!request.body.post){
        errors.push({message: 'Provide Post'});
    }
    if(!request.body.body){
        errors.push({message: 'Provide Body'});
    }

    if(errors.length > 0){

        response.render('admin/comments/create', {
            errors: errors
        });

    }else{

        let comment =new Comment({
            user: request.body.user,
            post: request.body.post,
            body: request.body.body
        });

        comment.save()
            .then(comment => {

                response.redirect('/admin/comments');
            })
            .catch(err => {
                console.log(err);
            });

    }

}

/// Edit Comment page
exports.editCommentPage =(request, response) => {

    let comment_id =request.params.id;

    Comment.findOne({'_id': comment_id})
        .then(comment => {
            response.render('admin/comments/edit', {
                comment: comment
            });
        })
        .catch(err => {
            console.log(err);
        });

}


/// Edit Comment
exports.editComment =(request, response) => {

    let comment_id =request.params.id;
    let query ={
        user: request.body.user,
        post: request.body.post,
        body: request.body.body
    };

    Comment.findByIdAndUpdate(comment_id, query)
        .then(comment => {
            
            response.redirect('/admin/comments');

        })
        .catch(err => {
            console.log(err);
        });

}


/// Remove Comment
exports.removeComment =(request, response) => {

    let comment_id =request.params.id;

    Comment.findByIdAndRemove(category_id)
        .then(comment => {
            
            return response.redirect('/admin/comments');

        })
        .catch(err => {
            console.log(err);
        });

}