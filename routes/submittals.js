var express = require('express'),
    router = express.Router();


router.get('/', function(req, res, next){
    res.render('submittals');;
});

module.exports = router;
