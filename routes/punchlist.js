var express = require('express'),
    router = express.Router();
    Project = require(__dirname + '/../models/project.js');


    router.get('/:id', function(req, res){
        Project.findOne({"projectInfo.number": req.params.id}, function(err, project){

        res.render('punchlist', {punchlists: project.punchlist, reqID: req.params.id});

      });
      });
module.exports = router;
