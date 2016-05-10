var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    fs = require('fs'),
    Projects = require(__dirname + '../../../models/project.js'),
    Rfi = require(__dirname + '../../../models/rfi.js');


router.get('/:id', function(req, res){
  Projects.find({}, function(err, projects){
    res.render('uploadRFI', { allProjects : projects});
  })

});

router.post('/:id', multer({dest: '../../uploads/'}).single('rfiUpload'), function(req, res){


fs.rename('../../uploads/'+ req.file.filename, '../../uploads/' + req.body.projectNumber + "/rfis/" + req.file.filename + req.file.originalname);

  req.file.filename = req.file.filename + req.file.originalname;

  var rfi = new Rfi({
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
    rfiFile: req.file
  });

  rfi.save(function(err){
    var status;
    if(err){
      status = "Something bad happend! Try Again! " + err.message;
      res.render("uploadStatus", {status: status, link: "/uploadRFI"});
      }


  status = "RFI Created"
  res.render("uploadStatus", {status: status, link: "/uploadRFI"});

  });
});

module.exports = router;
