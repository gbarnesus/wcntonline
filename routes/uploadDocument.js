var express = require('express'),
    router = express.Router();
    DocumentUp = require(__dirname + '/../models/documentUp.js');


router.get('/:id', function(req, res, next){
    res.render('uploadDocument', {reqID: req.params.id});

});

router.post('/:id', function(req, res, next){
  var documentUp = new DocumentUp({
    documentType: req.body.documentType,
    documentName: req.body.documentName,
    documentSubject: req.body.documentSubject
  });
  documentUp.save(function(err){
    var status;
    if(err){
      status = "Something bad happend! Try Again!"
      if (err.code === 11000) {
      status = "That Project Number is in use Allready"


      }
      res.render("uploadStatus", {status: status, link: "/createProject"})
    } else {

      status = "Document Uploaded"
      res.render("uploadStatus", {status: status, link: "/createProject"});
    }
      });
});


module.exports = router;
