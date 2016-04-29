var express = require('express'),
    router = express.Router(),
    Projects = require(__dirname + '/../models/project.js'),
    allProjects;


router.get('/', function(req, res){
  Projects.find({}, function(err, projects){
    allProjects = projects
    res.render('uploadPunchListItem', { allProjects : projects});
  })

});

router.post('/', function(req, res){
  var punchListItem = {
    itemNumber: req.body.itemNumber,
    punchDescription: req.body.punchDescription,
    responsibleContractor: req.body.responsibleContractor,
    creationDate: req.body.creationDate,
    responsibleContractor: req.body.responsibleContractor,
    dueDate: req.body.dueDate,
    punchStatus: req.body.punchStatus,

  }

  Projects.update({"projectInfo.name": req.body.projectName}, {$push: {"punchlist" : punchListItem}}, function(err, project){
    var status;
    if(err){
      status = "Something bad happend! Try Again!"
      res.render("uploadStatus", {status: status, link: "/uploadPunchListItem"});
      }


  status = "Punch List Item Created"
  res.render("uploadStatus", {status: status, link: "/uploadPunchListItem"});
  });
});

module.exports = router;
