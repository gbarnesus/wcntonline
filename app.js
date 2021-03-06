'use-strict'

var express = require('express'),
    app = express(),
    inspect = require('util').inspect,
    Busboy = require('busboy'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    sessions = require('client-sessions'),
    bcrypt = require('bcryptjs'),
    csrf = require('csurf'),
    logger = require('morgan'),
    path = require('path'),
    validate = require( __dirname + '/models/authentication.js');

/// require route pages
var homePage = require('./routes/index'),
    dashboard = require('./routes/dashboard'),
    login = require('./routes/login'),
    logout = require('./routes/logout'),
    projectDash = require('./routes/projectDash'),
    rfi = require('./routes/rfi'),
    submittals = require('./routes/submittals'),
    punchlist = require('./routes/punchlist'),
    register = require('./routes/register'),
    projectDocs = require('./routes/projectDocs'),
    adminDashboard = require('./routes/adminDashboard'),
    createProject = require('./routes/createProject');

//connect to mongo
mongoose.connect('mongodb://localhost/wcntOnline');
// configure express
    app.set('view engine', 'jade');
    app.set('views', path.join(__dirname, 'views'));
// middleware
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(sessions({
      cookieName: 'session',
      secret: 'asdklfja329048689yhfsdmnsdlkfj9342!!^$#@',
      duration: 30 * 60 * 1000,
      activeDuration: 5 * 60 * 1000,
    }));

    app.use(sessions({
      cookieName: 'admin',
      secret: 'sdfgsdjgsdfsdr4356gdfgdfg',
      duration: 30 * 60 * 1000,
      activeDuration: 5 * 60 * 1000,
    }));

    app.use(logger('dev'));
    app.use(csrf());
    app.use(validate.validateUser);
    app.use(validate.validateAdmin);

    function requireLogin(req, res, next){
      if (!req.user){
      res.redirect('/login' )
      } else {
          next();
        };
    };
    function requireAdminLogin(req, res, next){
      if (!req.admin){
        res.redirect('/login')
      } else {
        next();
      };
    };

//set routers
   app.use('/', homePage);
   app.use('/login', login);
   app.use('/dashboard', requireLogin, dashboard);
   app.use('/logout', logout);
   app.use('/projectDash', requireLogin, projectDash);
   app.use('/rfi', requireLogin, rfi);
   app.use('/submittals', requireLogin, submittals);
   app.use('/punchlist', requireLogin, punchlist);
   app.use('/projectDocs', requireLogin, projectDocs);
   app.use('/adminDashboard', requireAdminLogin, adminDashboard);
   app.use('/register', requireAdminLogin, register);
   app.use('/createProject', requireAdminLogin, createProject);


    app.listen(3000, function(){
      console.log('WCNT Online listening on port 3000');
    });
