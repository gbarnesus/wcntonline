var express = require('express'),
    router = express.Router(),
    Projects = require(__dirname + '/../models/project.js');


router.get('/', function(req, res){
  Projects.find({}, function(err, projects){
    res.render('uploadSubmittal', {csrfToken: req.csrfToken(), allProjects : projects});
  });

});

router.post('/', function(req, res){
  var submittal = {
    submittalNumber: req.body.submittalNumber,
    submittalSubject: req.body.submittalSubject,
    submittalSpecification: req.body.submittalSpecification,
    responsibleContractor: req.body.responsibleContractor,
    submittalStatus: req.body.submittalStatuss,
    reviewer: req.body.reviewer,
    reviewDate: req.body.reviewDate,
    reviewCode: req.body.reviewCode,

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
