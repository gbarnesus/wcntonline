var express = require('express'),
    router = express.Router();


router.get('/', function(req, res, next){
    res.render('adminDashboard', {csrfToken: req.csrfToken()});
});

module.exports = router;
