const express =require('express');
const router =express.Router();
const AdminController =require('../controllers/AdminController');
const CategoriesController =require('../controllers/CategoriesController');
const RolesController =require('../controllers/RolesController');
const PostsController =require('../controllers/PostsController');
const CommentsController =require('../controllers/CommentsController');
const UsersController =require('../controllers/UsersController');



router.all('/*', (request, response, next) => {

    request.app.locals.layout ="admin";
    next();

});


/////////////////////////////////////////////////////////
/// 1- Dashboard
/////////////////////////////////////////////////////////
router.get('/', AdminController.dashboardPage);


/////////////////////////////////////////////////////////
/// 2- Users
/////////////////////////////////////////////////////////
/// All Users Page
router.get('/users', UsersController.allUsersPage);
/// create Users Page
router.get('/users/create', UsersController.createUsersPage);
/// Create User
router.post('/users/create', UsersController.createUser);
/// Edit Users Page
router.get('/users/edit/:id', UsersController.editUserPage);
/// Edit Users 
router.put('/users/edit/:id', UsersController.editUser);
/// Delete Users
router.delete('/users/delete/:id', UsersController.removeUser);


/////////////////////////////////////////////////////////
/// 3- Roles
/////////////////////////////////////////////////////////
/// All Roles Page
router.get('/roles', RolesController.allRolesPage);
/// create Roles Page
router.get('/roles/create', RolesController.createRolesPage);
/// Create Roles
router.post('/roles/create', RolesController.createRole);
/// Edit Roles Page
router.get('/roles/edit/:id', RolesController.editRolePage);
/// Edit Roles
router.put('/roles/edit/:id', RolesController.editRole);
/// Delete Roles
router.delete('/roles/delete/:id', RolesController.removeRole);


/////////////////////////////////////////////////////////
/// 4- Categories
/////////////////////////////////////////////////////////
/// All Categories Page
router.get('/categories', CategoriesController.allCategoriesPage);
/// create Categories Page
router.get('/categories/create', CategoriesController.createCategoriesPage);
/// Create Categories
router.post('/categories/create', CategoriesController.createCategory);
/// Edit Categories Page
router.get('/categories/edit/:id', CategoriesController.editCategoryPage);
/// Edit Categories
router.put('/categories/edit/:id', CategoriesController.editCategory);
/// Delete Categories
router.delete('/categories/delete/:id', CategoriesController.removeCategory);


/////////////////////////////////////////////////////////
/// 5- Posts
/////////////////////////////////////////////////////////
/// All Posts Page
router.get('/posts', PostsController.allPostsPage);
/// create Posts Page
router.get('/posts/create', PostsController.createPostsPage);
/// Create Posts
router.post('/posts/create', PostsController.createPosts);
/// Edit Posts Page
router.get('/posts/edit/:id', PostsController.editPostPage);
/// Edit Posts
router.put('/posts/edit/:id', PostsController.editPost);
/// Delete Posts
router.delete('/posts/delete/:id', PostsController.removePost);



/////////////////////////////////////////////////////////
/// 6- Comments
/////////////////////////////////////////////////////////
/// All Comments Page
router.get('/comments', CommentsController.allCommentsPage);
/// create Comments Page
router.get('/comments/create', CommentsController.createCommentsPage);
/// Create Comments
router.post('/comments/create', CommentsController.createComment);
/// Edit Comments Page
router.get('/comments/edit/:id', CommentsController.editCommentPage);
/// Edit Comments
router.put('/comments/edit/:id', CommentsController.editComment);
/// Delete Comments
router.delete('/comments/delete/:id', CommentsController.removeComment);


module.exports =router;