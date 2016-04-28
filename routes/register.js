var express = require('express'),
    router = express.Router();
    User = require(__dirname + '/../models/user.js');


router.get('/', function(req, res, next){
  res.render('register', {csrfToken: req.csrfToken()});
});

router.post('/', function(req, res, next){
  var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  var user = new User({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email,
    admin: req.body.admin,
    company: req.body.company,
    password : hash
  });
  user.save(function(err){
    var status;
    if(err){
      status = "Something bad happend! Try Again!"
      if (err.code === 11000) {
      status = "that email is allready in use"

      }
    
      res.render('register.jade', {status: status, csrfToken: req.csrfToken()});
    } else {
      status = "Account Created";
    res.render('register', {status: status, csrfToken: req.csrfToken()});
  }
});
});


module.exports = router;
