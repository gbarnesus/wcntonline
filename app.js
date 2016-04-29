'use-strict';

var express = require('express'),
    app = express(),
    inspect = require('util').inspect,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    sessions = require('client-sessions'),
    bcrypt = require('bcryptjs'),
    logger = require('morgan'),
    path = require('path'),
    User = require(__dirname + '/models/user.js'),
    multer = require('multer');


/// require user route pages
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
    uploadDocument = require('./routes/uploadDocument'),

/// require admin rout pages
    adminDashboard = require('./routes/adminDashboard'),
    createProject = require('./routes/createProject'),
    uploadRFI = require('./routes/uploadRFI'),
    uploadSubmittal = require('./routes/uploadSubmittal'),
    uploadPunchListItem = require('./routes/uploadPunchListItem');

//connect to mongo
mongoose.connect('mongodb://localhost/wcntOnline');
// configure express
    app.set('view engine', 'jade');
    app.set('views', path.join(__dirname, 'views'));
// middleware
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(sessions({
      cookieName: 'session',
      secret: 'asdklfja329048689yhfsdmnsdlkfj9342!!^$#@',
      duration: 30 * 60 * 1000,
      activeDuration: 5 * 60 * 1000
    }));

    app.use(sessions({
      cookieName: 'adminSession',
      secret: 'sdfgsdjgsdfsdr4356gdfgdfg',
      duration: 30 * 60 * 1000,
      activeDuration: 5 * 60 * 1000
    }));

    app.use(logger('dev'));

    ///validate user
    app.use(function(req, res, next){
      if (req.session && req.session.user) {
        User.findOne({email: req.session.user.email}, function(err, user){
          if(user) {
            req.user = user;
            delete req.user.password;
            req.session.user = req.user;
            res.locals.user = req.user;
          }
          next();
        });
      } else {
        next();
      }
    });
    app.use(function(req, res, next){
    if (req.adminSession && req.adminSession.user) {
      User.findOne({email: req.adminSession.user.email, admin: "yes"}, function(err, user){
        if(user) {
          console.log("admin user");
          req.admin = user;
          delete req.admin.password
          req.adminSession.user = req.admin;
          res.locals.admin = req.admin;

        }
        next();
      });
    } else {
      next();
    };
    });
    function requireLogin(req, res, next){
      if (!req.user){
        console.log(req.user)
      res.redirect('/login' );
      } else {
          next();
        };
    };
    function requireAdminLogin(req, res, next){
      if (!req.admin){
        console.log(req.adminSession)
        res.redirect('/login');
      } else {
        console.log("pass" + req.adminSession)
        next();
      };
    };

//set routers user
   app.use('/', homePage);
   app.use('/login', login);
   app.use('/dashboard', requireLogin, dashboard);
   app.use('/logout', logout);
   app.use('/projectDash', requireLogin, projectDash);
   app.use('/rfi', requireLogin, rfi);
   app.use('/submittals', requireLogin, submittals);
   app.use('/punchlist', requireLogin, punchlist);
   app.use('/projectDocs', requireLogin, projectDocs);
   app.use('/uploadDocument', requireLogin, uploadDocument);
//set routers admin pages
   app.use('/adminDashboard', requireAdminLogin, adminDashboard);
   app.use('/register', requireAdminLogin, register);
   app.use('/createProject', requireAdminLogin, createProject);
   app.use('/uploadRFI', requireAdminLogin, uploadRFI);
   app.use('/uploadSubmittal', requireAdminLogin, uploadSubmittal);
   app.use('/uploadPunchListItem', requireAdminLogin, uploadPunchListItem);


    app.listen(3000, function(){
      console.log('WCNT Online listening on port 3000');
    });
