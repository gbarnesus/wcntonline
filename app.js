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
var homePage = require('./routes/user/index'),
    dashboard = require('./routes/user/dashboard'),
    login = require('./routes/login'),
    logout = require('./routes/logout'),
    projectDash = require('./routes/user/projectDash'),
    rfi = require('./routes/user/rfi'),
    submittals = require('./routes/user/submittals'),
    punchlist = require('./routes/user/punchlist'),

    uploadDocument = require('./routes/user/uploadDocument'),

/// require admin rout pages
    adminDashboard = require('./routes/admin/adminDashboard'),
    createProject = require('./routes/admin/createProject'),
    uploadRFI = require('./routes/admin/uploadRFI'),
    uploadSubmittal = require('./routes/admin/uploadSubmittal'),
    uploadPunchListItem = require('./routes/admin/uploadPunchListItem'),
    uploadedFiles = require('./routes/admin/uploadedFiles'),
    updateRFI = require('./routes/admin/updateRFI.js'),
    register = require('./routes/admin/register'),
    adminProjects = require('./routes/admin/adminProjects.js'),
    adminSubmittal = require('./routes/admin/adminSubmittal.js'),
    adminRfi = require('./routes/admin/adminRfi'),
    adminPunchlist = require('./routes/admin/adminPunchlist');
//connect to mongo
mongoose.connect('mongodb://localhost/wcntOnline');
// configure express
    app.set('view engine', 'jade');
    app.set('views', [__dirname + "/views",__dirname + "/views/user", __dirname + "/views/admin/"]);
// middleware
    app.use( express.static('public'));
    app.use('/uploads',express.static('uploads'));
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
   app.use('/uploadDocument', requireLogin, uploadDocument);
//set routers admin pages
   app.use('/adminDashboard', requireAdminLogin, adminDashboard);
   app.use('/register', requireAdminLogin, register);
   app.use('/createProject', requireAdminLogin, createProject);
   app.use('/uploadRFI', requireAdminLogin, uploadRFI);
   app.use('/uploadSubmittal', requireAdminLogin, uploadSubmittal);
   app.use('/uploadPunchListItem', requireAdminLogin, uploadPunchListItem);
   app.use('/uploadedFiles', requireAdminLogin, uploadedFiles);
   app.use('/updateRFI', requireAdminLogin, updateRFI);
   app.use('/adminProjects', requireAdminLogin, adminProjects);
   app.use('/adminSubmittals', requireAdminLogin, adminSubmittal);
   app.use('/adminRfis', requireAdminLogin, adminRfi);
   app.use('/adminPunchlists', requireAdminLogin, adminPunchlist);


    app.listen(3000, function(){
      console.log('WCNT Online listening on port 3000');
    });
