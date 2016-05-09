var express = require('express'),
    router = express.Router(),
    Projects = require(__dirname + '../../../models/project.js');



router.get('/:id', function(req, res, next){

  Projects.find({"projectInfo.number": req.params.id}, function(err, project){
    res.render("adminProjects" ,{projects: project, reqID: req.params.id})

});



});

module.exports = router;
