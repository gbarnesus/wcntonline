var express = require('express'),
    router = express.Router();
        Project = require(__dirname + '/../models/project.js');


router.get('/', function(req, res, next){
  res.render('createProject', {csrfToken: req.csrfToken()});
});

router.post('/', function(req, res, next){
  var project = new Project({
    projectInfo: {
      name: req.body.projectName,
      number: req.body.projectNumber,
      address: req.body.projectAddress,
      city: req.body.projectCity,
      state: req.body.projectState,
      zip: req.body.projectZip
    },
    projectTeam: {
      projectManager: {
        name: req.body.projectManager,
        email: req.body.managerEmail,
        phone: req.body.managerPhone
    },
      projectSuperindendent: {
        name: req.body.projectSuper,
        email: req.body.superEmail,
        phone: req.body.superPhone
      }
    },
    subcontractor: req.body.subcontractor
  });
  project.save(function(err){
  if(err){
    var err = "something bad happend! Try Again!"
    if (err === 11000) {
      var error = "that project number is allready in use"
    }
    res.render('register.jade', {error: error});
  }
  res.redirect('/adminDashboard');
  })
});

module.exports = router;
