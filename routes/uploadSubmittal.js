var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    fs = require('fs'),
    Projects = require(__dirname + '/../models/project.js');


router.get('/', function(req, res, next){
  Projects.find({}, function(err, projects){
    res.render('uploadSubmittal', {allProjects : projects});
  });

});

router.post('/', multer({dest: './uploads/'}).single('submittalUpload'), function(req, res, next){
  fs.rename('./uploads/'+ req.file.filename, './uploads/' + req.file.filename + req.file.originalname);
req.file.filename = req.file.filename + req.file.originalname;
  var submittal = {

    submittalNumber: req.body.submittalNumber,
    submittalSubject: req.body.submittalSubject,
    submittalSpecification: req.body.submittalSpecification,
    responsibleContractor: req.body.responsibleContractor,
    submittalStatus: req.body.submittalStatus,
    reviewer: req.body.reviewer,
    reviewDate: req.body.reviewDate,
    reviewCode: req.body.reviewCode,
    submittalFile: req.file

  }

  Projects.update({"projectInfo.name": req.body.projectName}, {$push: {"submittals" : submittal}}, function(err, project){
    var status;
    if(err){
      status = "Something bad happend! Try Again!"
      res.render("uploadStatus", {status: status, link: "/uploadSubmittal"});
      }


  status = "Submittal Created"
  res.render("uploadStatus", {status: status, link: "/uploadSubmittal"});
  });
});

module.exports = router;
