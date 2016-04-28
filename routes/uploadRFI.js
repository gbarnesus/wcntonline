var express = require('express'),
    router = express.Router(),
    Projects = require(__dirname + '/../models/project.js');


router.get('/', function(req, res){
  Projects.find({}, function(err, projects){
    res.render('uploadRFI', {csrfToken: req.csrfToken(), allProjects : projects});
  })

});

router.post('/', function(req, res){
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
  }
  console.log(req.body.projectName)
  Projects.update({"projectInfo.name": req.body.projectName}, {$push: {"rfiData" : rfi}}, function(err, project){
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
