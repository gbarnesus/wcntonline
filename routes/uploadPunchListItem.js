var express = require('express'),
    router = express.Router(),
    Projects = require(__dirname + '/../models/project.js');


router.get('/', function(req, res){
  Projects.find({}, function(err, projects){
    res.render('uploadPunchListItem', {csrfToken: req.csrfToken(), allProjects : projects});
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
  console.log(req.body.projectName)
  Projects.update({"projectInfo.name": req.body.projectName}, {$push: {"punchlist" : punchListItem}}, function(err, project){
    if(err){
      var err = "something bad happend! Try Again!"
      if (err === 11000) {
        var error = "that email is allready in use"
      }
    res.render("uploadPunchList", {error: error, allProjects: "please refresh", csrfToken: req.csrfToken()});
  }
  res.redirect("/uploadPunchListItem");
  });
});

module.exports = router;
