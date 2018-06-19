const express =require('express');
const router =express.Router();
const PublicController =require('../controllers/publicController');
const AuthController =require('../controllers/AuthController');

router.all('/*', (request, response, next) => {

    request.app.locals.layout ="home";
    next();

});

/// Home Page
router.get('/', PublicController.homePage);

/// Single Post Page
router.get('/single/:id', PublicController.singlePostPage);
/// Create Comment
router.post('/single/comment/create', PublicController.createComment);

/// About Page
router.get('/about', PublicController.aboutPage);

/// Register Page
router.get('/register', PublicController.registerPage);

/// Register Use
router.post('/register', AuthController.registerUser);

/// Login Page
router.get('/login', PublicController.loginPage);

/// Login User
router.post('/register', AuthController.loginUser);

module.exports =router;