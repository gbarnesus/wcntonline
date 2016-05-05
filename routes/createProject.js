var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    fs = require('fs'),
    Project = require(__dirname + '/../models/project.js'),
    User = require(__dirname + '/../models/user.js');


router.get('/', function(req, res, next){
  User.find({}, function(err, user){

      res.render('createProject', {users: user});
  });

});

router.post('/', multer({dest: './uploads/'}).fields([{name: 'plans'}, {name: "specs"}]), function(req, res, next){
  fs.mkdir('./uploads/' + req.body.projectNumber);
  fs.mkdir('./uploads/' + req.body.projectNumber + "/submittals");
  fs.mkdir('./uploads/' + req.body.projectNumber + "/rfis");
  fs.mkdir('./uploads/' + req.body.projectNumber + "/punchlists");
  fs.mkdir('./uploads/' + req.body.projectNumber + "/subUploads");
  fs.mkdir('./uploads/' + req.body.projectNumber+ "/plans-specs");

  fs.rename('./uploads/'+ req.files.plans[0].filename, './uploads/' + req.body.projectNumber + "/plans-specs/" + req.files.plans[0].filename + "plans.pdf");
  fs.rename('./uploads/'+ req.files.specs[0].filename, './uploads/' + req.body.projectNumber + "/plans-specs/" + req.files.specs[0].filename + "specs.pdf");



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
    subcontractor: req.body.subcontractor,
    rfiData: [],
    submittals: [],
    punchlist: [],
    plans: req.files.plans,
    specs: req.files.specs

  });
  project.save(function(err){
    var status;
    if(err){
      status = "Something bad happend! Try Again!"
      if (err.code === 11000) {
      status = "That Project Number is in use Allready"


      }
      res.render("uploadStatus", {status: status, link: "/createProject"})
    } else {

      status = "Project Created"
      res.render("uploadStatus", {status: status, link: "/createProject"});
    }
      });
});

module.exports = router;
