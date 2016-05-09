var express = require('express'),
    router = express.Router(),
    Projects = require(__dirname + '../../../models/project.js');



router.get('/', function(req, res, next){

  Projects.find({subcontractor: req.session.user.email}, function(err, project){

    res.render("dashboard" ,{projects: project})

});



});

module.exports = router;
