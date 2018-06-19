const express =require('express');
const mongoose =require('mongoose');
const bodyParser =require('body-parser');
const hbs =require('express-handlebars');
const fileUpload =require('express-fileupload');
const session =require('express-session');
const flash =require('connect-flash');
const methodOverride =require('method-override');
const app =express();
const PORT =process.env.PORT || 8080;
const { formatDate, checkedIfIsEqual, selectedIfIsEqual, renderSelect } =require('./helpers/helpers');


///////////////////////////////////////////
/// Connect To Database
///////////////////////////////////////////
mongoose.Promise =global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/cms')
    .then(db => {
        console.log('MongoDB Connected');
    }).catch(err => {
        console.log(err);
    });


///////////////////////////////////////////
/// View Engine
///////////////////////////////////////////
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'home',
    layoutsDir: __dirname+'/views/layouts',
    partialsDir: __dirname+'/views/partials',
    helpers: { 
        formatDate: formatDate,
        checkedIfIsEqual: checkedIfIsEqual,
        selectedIfIsEqual: selectedIfIsEqual,
        renderSelect: renderSelect
     }
}));
app.set('view engine', 'hbs');



///////////////////////////////////////////
/// Middlewares
///////////////////////////////////////////
app.use(session({
    secret: 'yassinesupersecret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use(methodOverride('_method'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

app.use(express.static(__dirname+'/public'));

/// send sessions to the front-end
app.use((request, response, next) => {

    response.locals.success_message =request.flash('success_message');
    next();

});


///////////////////////////////////////////
/// Routes
///////////////////////////////////////////
const public_routes =require('./routes/public');
const admin_routes =require('./routes/admin');

app.use('/', public_routes);
app.use('/admin', admin_routes);



///////////////////////////////////////////
/// Listen For Server
///////////////////////////////////////////
app.listen(PORT, (err) => {
    if(err){
        console.log(err);
    }
        console.log(`Your Server Is Running On Port ${PORT}`);
});