var express = require('express'),
    router = express.Router(),
    Projects = require(__dirname + '/../models/project.js');



router.get('/', function(req, res, next){

  Projects.find({}, function(err, project){

    res.render("adminDashboard" ,{projects: project})
    console.log(project)

});



});

module.exports = router;
