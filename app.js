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

 app.use(csrf());
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
function requireLogin(req, res, next){
  if (!req.user){
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


//post routes
app.post('/login',  function(req, res){
  User.findOne({email: req.body.email}, function(err, user){
      if(!user) {
        res.render('dashboard', {error: 'Invalid email or Password'});
      } else {
        if (bcrypt.compareSync(req.body.password, user.password)){
          req.session.user = user;
          res.redirect('/dashboard')
        } else {
          res.render('login.jade', {error: 'Invalid email or Password', csrfToken: req.csrfToken()});
        }
      }
    })
});



    app.listen(3000, function(){
      console.log('WCNT Online listening on port 3000');
    });
