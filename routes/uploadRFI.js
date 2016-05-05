var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    fs = require('fs'),
    Projects = require(__dirname + '/../models/project.js');


router.get('/', function(req, res){
  Projects.find({}, function(err, projects){
    res.render('uploadRFI', { allProjects : projects});
  })

});

router.post('/', multer({dest: './uploads/'}).single('rfiUpload'), function(req, res){


fs.rename('./uploads/'+ req.file.filename, './uploads/' + req.body.projectNumber + "/rfis/" + req.file.filename + req.file.originalname);

  req.file.filename = req.file.filename + req.file.originalname;

  var rfi = {
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
  }

  Projects.update({"projectInfo.number": req.body.projectNumber}, {$push: {"rfiData" : rfi}}, function(err, project){
    var status;
    if(err){
      status = "Something bad happend! Try Again!"
      res.render("uploadStatus", {status: status, link: "/uploadRFI"});
      }


  status = "RFI Created"
  res.render("uploadStatus", {status: status, link: "/uploadRFI"});

  });
});

module.exports = router;
