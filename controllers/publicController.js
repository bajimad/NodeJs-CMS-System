const { Category } =require('../models/Category');
const { Post } =require('../models/Post');
const { Comment } =require('../models/Comment');


/// Home Page
exports.homePage =(request, response) => {
    
    const perPage =10;
    const page =request.query.page || 1;

    Post.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then(posts => {

            Post.count()
                .then(postCount => {
                
                Category.find()
                    .then(categories => {
                        
                        request.flash('success_message', 'The Best Session');

                        response.render('home/index', {
                            posts: posts,
                            categories: categories,
                            currentPage: parseInt(page),
                            pages: Math.ceil(postCount / perPage)
                        });

                    })
                    .catch(err => {
                        return response.status(400).send(err);
                    });


            })
            .catch(err => {
                console.log(err);
            });


        })
        .catch(err => {
            return response.status(400).send(err);
        });

}


/// Single Post Page
exports.singlePostPage =(request, response) => {

    /// grap post id in request parameters
    let post_id =request.params.id;

    /// find post by id
    Post.findOne({'_id': post_id})
        .then(post => {
            
            /// fetch all categories
            Category.find()
                .then(categories => {

                    /// find comments by post id
                    Comment.find({'post' : post._id})
                        .then(comments => {

                            response.render('home/single', {
                                post: post,
                                categories: categories,
                                comments: comments
                            });

                        })
                        .catch(err => {
                            console.log(err);
                        });
                    
                    

                })
                .catch(err => {
                    return response.status(400).send(err);
                });

        })
        .catch(err => {
            return response.status(400).send(err);
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

        return response.redirect(`/`, {
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

                response.redirect(`/`);
            })
            .catch(err => {
                console.log(err);
            });

    }

}



/// About Page
exports.aboutPage =(request, response) => {

    Category.find()
        .then(categories => {
            
            response.render('home/about', {
                categories: categories
            });

        })
        .catch(err => {
            return response.status(400).send(err);
        });

}


/// Login Page
exports.loginPage =(request, response) => {

    Category.find()
        .then(categories => {
            
            response.render('home/login', {
                categories: categories
            });

        })
        .catch(err => {
            return response.status(400).send(err);
        });

}


/// Register Page
exports.registerPage =(request, response) => {


    Category.find()
        .then(categories => {
            
            response.render('home/register', {
                categories: categories
            });

        })
        .catch(err => {
            return response.status(400).send(err);
        });

}


