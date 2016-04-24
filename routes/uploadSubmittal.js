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
  console.log(req.body.projectName)
  Projects.update({"projectInfo.name": req.body.projectName}, {$push: {"submittals" : submittal}}, function(err, project){
    if(err){
      var err = "something bad happend! Try Again!"
      if (err === 11000) {
        var error = "that email is allready in use"
      }
    res.render("uploadSubmittal", {error: error, allProjects: "please refresh", csrfToken: req.csrfToken()});
  }
  res.redirect("/uploadSubmittal");
  });
});

module.exports = router;
