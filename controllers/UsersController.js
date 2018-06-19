const { Post } =require('../models/Post');
const { Role } =require('../models/Role');
const { User } =require('../models/User');
const { Category } =require('../models/Category');


/// All Users Page
exports.allUsersPage =(request, response) => {

    User.find()
        .then(users => {
            response.render('admin/users/index', {
                users: users
            });
        })
        .catch(err => {
            console.log(err);
        });

}

/// Create Users Page
exports.createUsersPage =(request, response) => {

    response.render('admin/users/create');

}

/// Create User
exports.createUser =(request, response) => {

    let errors =[];

    if(!request.body.name){
        errors.push({message: 'Provide Name'});
    }

    if(errors.length > 0){

        response.render('admin/categories/create', {
            errors: errors
        });

    }else{

        let user =new User({
            name: request.body.name
        });

        user.save()
            .then(category => {

                response.redirect('/admin/users');
            })
            .catch(err => {
                console.log(err);
            });

    }

}

/// Edit User page
exports.editUserPage =(request, response) => {

    let user_id =request.params.id;

    Role.find({'_id': user_id})
        .then(roles => {

            User.findOne({'_id' : user_id})
                .then(user => {
                    response.render('admin/users/edit', {
                        roles: roles,
                        user: user
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


/// Edit User
exports.editUser =(request, response) => {

    let user_id =request.params.id;
    let query ={
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        password: request.body.password
    };


    User.findByIdAndUpdate(user_id, query)
        .then(user => {
            
            response.redirect('/admin/users');

        })
        .catch(err => {
            console.log(err);
        });

}


/// Remove User
exports.removeUser =(request, response) => {

    let user_id =request.params.id;

    User.findByIdAndRemove(user_id)
        .then(user => {
            
            return response.redirect('/admin/users');

        })
        .catch(err => {
            console.log(err);
        });

}