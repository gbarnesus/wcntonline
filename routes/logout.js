var express = require('express'),
    router = express.Router();


router.get('/', function(req, res){
  req.session.reset()
  req.adminSession.reset()
  res.redirect('/');
});

module.exports = router;
