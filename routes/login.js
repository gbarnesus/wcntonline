var express = require('express'),
    router = express.Router();
    User = require(__dirname + '/../models/user.js'),
    bcrypt = require('bcryptjs');

router.get('/', function(req, res, next){
    res.render("login", {csrfToken: req.csrfToken()});
});
router.post('/', function(req, res, next){
  User.findOne({email: req.body.email}, function(err, user){
      if(!user) {
        res.render('login', {error: 'Invalid email or Password', csrfToken: req.csrfToken() });
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

module.exports = router;
