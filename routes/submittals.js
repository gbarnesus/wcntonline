var express = require('express'),
    router = express.Router(),
    Project = require(__dirname + '/../models/project.js');


    router.get('/:id', function(req, res){
        Project.findOne({"projectInfo.number": req.params.id}, function(err, project){

        res.render('submittals', {submittals: project.submittals, reqID: req.params.id});

      });
      });

module.exports = router;
