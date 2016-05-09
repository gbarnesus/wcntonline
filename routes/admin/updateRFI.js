var express = require('express'),
    router = express.Router(),
    Project = require(__dirname + '../../../models/project.js'),
    Rfi = require(__dirname + '../../../models/rfi.js')

router.get('/:id', function(req, res){
    Rfi.find({"projectNumber": req.params.id}, function(err, rfi){
      console.log(rfi)
    res.render('updateRFI', {rfis: rfi, reqID: req.params.id});


  });
  });

router.post('/:id', multer({dest: './uploads/'}).single('upl'), function(req, res){
  Rfi.findByIdAndUpdate(req.body._id, {
    projectNumber: req.body.projectNumber,
    rfiName: req.body.rfiName,
    rfiSubject: req.body.rfiSubject,
    responsibleContractor: req.body.responsibleContractor,
    assignee: req.body.assignee,
    dateInitiated: req.body.dateInitiated,
    dueDate: req.body.dueDate,
    ballInCourt: req.body.ballInCourt,
    scheduleImpact: req.body.scheduleImpact,
    costImpact: req.body.costImpact,


  }, function(err, model){
    if (err){
      res.send(err.message)
    }
      res.send(req.body);
  });

});

module.exports = router;
