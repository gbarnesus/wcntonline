var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    fs = require('fs'),
    Projects = require(__dirname + '/../models/project.js'),
    Punchlist = require(__dirname + '/../models/punchlist.js'),
    allProjects;


router.get('/', function(req, res){
  Projects.find({}, function(err, projects){
    allProjects = projects
    res.render('uploadPunchListItem', { allProjects : projects});
  })

});

router.post('/', multer({dest: './uploads/'}).single('punchlistUpload'), function(req, res){
fs.rename('./uploads/'+ req.file.filename, './uploads/' + req.body.projectNumber + "/punchlists/" + req.file.filename + req.file.originalname);
req.file.filename = req.file.filename + req.file.originalname;
  var punchListItem = new Punchlist({
    projectNumber: req.body.projectNumber,
    itemNumber: req.body.itemNumber,
    punchDescription: req.body.punchDescription,
    responsibleContractor: req.body.responsibleContractor,
    creationDate: req.body.creationDate,
    responsibleContractor: req.body.responsibleContractor,
    dueDate: req.body.dueDate,
    punchStatus: req.body.punchStatus,
    punchlistFile: req.file

  });

  punchListItem.save(function(err){
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
