const { Post } =require('../models/Post');
const { Category } =require('../models/Category');


/// All Posts Page
exports.allCategoriesPage =(request, response) => {

    Category.find()
        .then(categories => {
            response.render('admin/categories/index', {
                categories: categories
            });
        })
        .catch(err => {
            console.log(err);
        });

}

/// Create Posts Page
exports.createCategoriesPage =(request, response) => {

    response.render('admin/categories/create');

}

/// Create category
exports.createCategory =(request, response) => {

    let errors =[];

    if(!request.body.name){
        errors.push({message: 'Provide Name'});
    }

    if(errors.length > 0){

        response.render('admin/categories/create', {
            errors: errors
        });

    }else{

        let category =new Category({
            name: request.body.name
        });

        category.save()
            .then(category => {
                
                request.flash('success_message', 'Category Created Successfully');

                response.redirect('/admin/categories');
            })
            .catch(err => {
                console.log(err);
            });

    }

}

/// Edit category page
exports.editCategoryPage =(request, response) => {

    let category_id =request.params.id;

    Category.findOne({'_id': category_id})
        .then(category => {
            response.render('admin/categories/edit', {
                category: category
            });
        })
        .catch(err => {
            console.log(err);
        });

}


/// Edit Category
exports.editCategory =(request, response) => {

    let category_id =request.params.id;
    let query ={
        name: request.body.name
    };


    Category.findByIdAndUpdate(category_id, query)
        .then(category => {

            request.flash('success_message', 'Category Updated Successfully');
            
            response.redirect('/admin/categories');

        })
        .catch(err => {
            console.log(err);
        });

}


/// Remove category
exports.removeCategory =(request, response) => {

    let category_id =request.params.id;

    Category.findByIdAndRemove(category_id)
        .then(category => {

            request.flash('success_message', 'Category Deleted Successfully');
            
            return response.redirect('/admin/categories');

        })
        .catch(err => {
            console.log(err);
        });

}