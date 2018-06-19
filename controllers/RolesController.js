const { Role } =require('../models/Role');
const { Comment } =require('../models/Comment');
const { User } =require('../models/User');


/// All Roles Page
exports.allRolesPage =(request, response) => {

    Role.find()
        .then(roles => {
            response.render('admin/roles/index', {
                roles: roles
            });
        })
        .catch(err => {
            console.log(err);
        });

}

/// Create Roles Page
exports.createRolesPage =(request, response) => {

    response.render('admin/roles/create');

}

/// Create Role
exports.createRole =(request, response) => {

    let errors =[];

    if(!request.body.name){
        errors.push({message: 'Provide Name'});
    }

    if(errors.length > 0){

        response.render('admin/roles/create', {
            errors: errors
        });

    }else{

        let role =new Role({
            name: request.body.name
        });

        role.save()
            .then(role => {

                response.redirect('/admin/roles');
            })
            .catch(err => {
                console.log(err);
            });

    }

}

/// Edit Role page
exports.editRolePage =(request, response) => {

    let role_id =request.params.id;

    Role.findOne({'_id': role_id})
        .then(role => {
            response.render('admin/roles/edit', {
                role: role
            });
        })
        .catch(err => {
            console.log(err);
        });

}


/// Edit Role
exports.editRole =(request, response) => {

    let role_id =request.params.id;
    let query ={
        name: request.body.name,
    };

    Role.findByIdAndUpdate(role_id, query)
        .then(role => {
            
            response.redirect('/admin/roles');

        })
        .catch(err => {
            console.log(err);
        });

}


/// Remove Role
exports.removeRole =(request, response) => {

    let role_id =request.params.id;

    Role.findByIdAndRemove(role_id)
        .then(role => {
            
            return response.redirect('/admin/roles');

        })
        .catch(err => {
            console.log(err);
        });

}