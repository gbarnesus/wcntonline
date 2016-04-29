var express = require('express'),
    router = express.Router();
    User = require(__dirname + '/../models/user.js'),
    bcrypt = require('bcryptjs');

router.get('/', function(req, res, next){
    res.render("login");
});
router.post('/', function(req, res, next){
  User.findOne({email: req.body.email}, function(err, user){
      if(!user) {
        res.render('login', {error: 'Invalid email or Password' });
      } else {
        if (bcrypt.compareSync(req.body.password, user.password)){
          if(user.admin === "yes"){
            req.session.user = user;
            req.adminSession.user = user;
            res.redirect('/adminDashboard')
          } else {
            req.session.user = user;
            req.adminSession.user = "";
            res.redirect('/dashboard')
          }


        } else {
          res.render('login.jade', {error: 'Invalid email or Password'});
        }
      }
    })
});

module.exports = router;
