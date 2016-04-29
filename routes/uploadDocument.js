var express = require('express'),
    router = express.Router();
    DocumentUp = require(__dirname + '/../models/documentUp.js'),
    multer = require('multer');



router.get('/:id', function(req, res, next){
    res.render('uploadDocument', {reqID: req.params.id});

});

router.post('/:id', multer({dest: './uploads/'}).single('upl'), function(req, res, next){
console.log(req.body);
console.log(req.file);
res.status(204).end();



 var documentUp = new DocumentUp({
    documentType: req.body.documentType,
    documentName: req.body.documentName,
    documentSubject: req.body.documentSubject,
    documentFile: req.file
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
