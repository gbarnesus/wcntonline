var express = require('express'),
    router = express.Router(),
    Project = require(__dirname + '/../models/project.js'),
    Rfi = require(__dirname + '/../models/rfi.js')

router.get('/:id', function(req, res){
    Rfi.find({"projectNumber": req.params.id}, function(err, rfi){
    res.render('rfi', {rfis: rfi, reqID: req.params.id});

  });
  });

module.exports = router;
