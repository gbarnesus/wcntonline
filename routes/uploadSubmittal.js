var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    fs = require('fs'),
    Projects = require(__dirname + '/../models/project.js'),
    Submittal = require(__dirname + '/../models/submittal.js')


router.get('/', function(req, res, next){
  Projects.find({}, function(err, projects){
    res.render('uploadSubmittal', {allProjects : projects});
  });

});

router.post('/', multer({dest: './uploads/'}).single('submittalUpload'), function(req, res, next){
  fs.rename('./uploads/'+ req.file.filename, './uploads/' + req.body.projectNumber + "/submittals/" + req.file.filename + req.file.originalname);
req.file.filename = req.file.filename + req.file.originalname;
  var submittal = new Submittal( {
    projectNumber: req.body.projectNumber,
    submittalNumber: req.body.submittalNumber,
    submittalSubject: req.body.submittalSubject,
    submittalSpecification: req.body.submittalSpecification,
    responsibleContractor: req.body.responsibleContractor,
    submittalStatus: req.body.submittalStatus,
    reviewer: req.body.reviewer,
    reviewDate: req.body.reviewDate,
    reviewCode: req.body.reviewCode,
    submittalFile: req.file

  });

submittal.save(function(err){
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
