var express = require('express'),
    router = express.Router();


router.get('/', function(req, res, next){
  res.redirect("/dashboard")
});

module.exports = router;
