var express = require('express'),
    router = express.Router(),
    Project = require(__dirname + '../../../models/project.js'),
    Submittal = require(__dirname + '../../../models/submittal.js')


    router.get('/:id', function(req, res){
        Submittal.find({"projectNumber": req.params.id}, function(err, submittals){

        res.render('adminSubmittals', {submittals: submittals, reqID: req.params.id});

      });
      });

module.exports = router;
