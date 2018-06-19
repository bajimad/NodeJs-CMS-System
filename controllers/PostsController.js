const { Post } =require('../models/Post');
const { Category } =require('../models/Category');
const { User } =require('../models/User');


/// All Posts Page
exports.allPostsPage =(request, response) => {

    Post.find()
        .then(posts => {
            response.render('admin/posts/index', {
                posts: posts
            });
        })
        .catch(err => {
            console.log(err);
        });

}

/// Create Posts Page
exports.createPostsPage =(request, response) => {

    User.find()
        .then(users => {

            Category.find()
                .then(categories => {
                    response.render('admin/posts/create', {
                        categories: categories,
                        users: users
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

/// Create Post
exports.createPosts =(request, response) => {

    let errors =[];

    let filename ='image_placeholder.png';

    if(request.files != null){

        let file =request.files.file;
        filename =Date.now()+file.name;

        file.mv('./public/uploads/'+filename, (err) => {
            if(err){ 
                console.log(err); 
            }
                console.log('File Uploaded Successfully');
        });

    }

    let post =new Post({
        user: request.body.user,
        category: request.body.category,
        title: request.body.title,
        status: request.body.status,
        body: request.body.body,
        file: filename
    });

    if(request.body.allow_comments == 'on'){
        post.allow_comments =true;
    }else{
        post.allow_comments =false;
    }

    post.save()
        .then(post => {
            
            request.flash('success_message', 'Post Created Successfully');

            response.redirect('/admin/posts');
        })
        .catch(err => {
            console.log(err);
        });

}

/// Edit post page
exports.editPostPage =(request, response) => {

    let post_id =request.params.id;

    Post.findOne({'_id': post_id})
        .then(post => {

            Category.find()
                .then(categories => {
                    
                    User.find()
                        .then(users => {
                            
                            response.render('admin/posts/edit', {
                                post: post,
                                categories: categories,
                                users: users
                            });

                        })
                        .catch(err => {
                            console.log(err);
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


/// Edit post
exports.editPost =(request, response) => {

    let post_id =request.params.id;
    let query ={
        user: request.body.user,
        category: request.body.category,
        title: request.body.title,
        status: request.body.status,
    };

    let filename ='image_placeholder.png';

    if(request.files != null){

        let file =request.files.file;
        filename =Date.now()+file.name;

        query.file =filename;

        file.mv('/public/uploads/'+filename, (err) => {
            if(err){ 
                console.log(err); 
            }
                console.log('File Uploaded Successfully');
        });

    }


    if(request.body.allow_comments == 'on'){
        query.allow_comments =true;
    }else{
        query.allow_comments =false;
    }


    Post.findByIdAndUpdate(post_id, query)
        .then(post => {
            
            response.redirect('/admin/posts');

        })
        .catch(err => {
            console.log(err);
        });

}


/// Remove post
exports.removePost =(request, response) => {

    let post_id =request.params.id;

    Post.findByIdAndRemove(post_id)
        .then(post => {
            
            return response.redirect('/admin/posts');

        })
        .catch(err => {
            console.log(err);
        });

}