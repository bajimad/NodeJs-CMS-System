const { User } =require('../models/User');


/// Register Use
exports.registerUser =(request, response) => {

    let errors =[];

    if(!request.body.first_name){
        errors.push({message: 'Provide First Name'});
    }
    if(!request.body.last_name){
        errors.push({message: 'Provide Last Name'});
    }
    if(!request.body.email){
        errors.push({message: 'Provide Email'});
    }
    if(!request.body.password){
        errors.push({message: 'Provide Password'});
    }
    if(request.body.password != request.body.confirm_password){
        errors.push({message: 'Password Do Not Match'});
    }

    if(errors.length > 0){

        response.render('home/register', {
            errors: errors
        });

    }else{

        let user =new User({
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            email: request.body.email,
            password: request.body.password
        });

        user.save()
            .then(user => {
                return response.redirect('/login');
            })
            .catch(err => {
                return response.status(400).send(err);
            });

    }

}


/// Login User
exports.loginUser =(request, response) => {

    let errors =[];

}