'use-strict'

var express = require('express'),
    app = express(),
    inspect = require('util').inspect,
    Busboy = require('busboy'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    sessions = require('client-sessions'),
    bcrypt = require('bcryptjs'),
    csrf = require('csurf');


    var User = mongoose.model('User', new Schema({
      id: ObjectId,
      firstName: String,
      lastName: String,
      email: {type: String, unique: true},
      password: String,
      admin: String,
    }));
//connect to mongo
mongoose.connect('mongodb://localhost/wcntOnline');
// configure express
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');
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

 app.use(csrf());

  app.use(function(req, res, next){
    console.log(req.session.user)
    console.log(req.admin.user)
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
function requireLogin(req, res, next){
  if (!req.user){

    res.redirect('/login' )
  } else {
    next();
  };
};
function requireAdminLogin(req, res, next){
  if (!req.admin.user){
    res.redirect('/login')
  } else {
    next();
  };
};



//get routes
    app.get('/', function(req, res){
      res.redirect('/dashboard')
    });
    app.get('/login', function(req, res){
      res.render('login.jade', { csrfToken: req.csrfToken() } );
    }); //end app.get "/"
    app.get('/dashboard', requireLogin, function(req, res){
        res.render('dashboard.jade');
      });
      app.get('/logout', function(req, res){
        req.session.reset()
        req.admin.reset()
        res.redirect('/');
      });
    app.get('/projectDash', requireLogin, function(req, res){
      res.render('projectDash');
    })
    app.get('/rfi', requireLogin, function(req, res){
      res.render('rfi');
    })

    app.get('/submitals', requireLogin, function(req, res){
      res.render('submitals');
    })

    app.get('/punchlist', requireLogin, function(req, res){
      res.render('punchlist');
    })

    app.get('/projectdocs', requireLogin, function(req, res){
      res.render('projectdocs');
    })
    app.get('/adminDashboard', requireAdminLogin, function(req, res){
      res.render('adminDashboard', {csrfToken: req.csrfToken()});
    })
    app.get('/register', function(req, res){
      res.render('register', {csrfToken: req.csrfToken()});
    })




//post routes
app.post('/login',  function(req, res){
  User.findOne({email: req.body.email}, function(err, user){
      if(!user) {
        res.render('login', {error: 'Invalid email or Password'});
      } else {
        if (bcrypt.compareSync(req.body.password, user.password)){
          if(user.admin === "yes"){
            req.session.user = user;
            req.admin.user = user;
            res.redirect('/adminDashboard')
          } else {
            req.session.user = user;
            res.redirect('/dashboard')
          }


        } else {
          res.render('login.jade', {error: 'Invalid email or Password', csrfToken: req.csrfToken()});
        }
      }
    })
});
app.post('/register', function(req, res){
  var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  var user = new User({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email,
    admin: req.body.admin,
    password : hash
  });
  user.save(function(err){
  if(err){
    var err = "something bad happend! Try Again!"
    if (err === 11000) {
      var error = "that email is allready in use"
    }
    res.render('register.jade', {error: error});
  }
  res.redirect('/dashboard');
})
});



    app.listen(3000, function(){
      console.log('WCNT Online listening on port 3000');
    });
