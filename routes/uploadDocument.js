var express = require('express'),
    router = express.Router();
    DocumentUp = require(__dirname + '/../models/documentUp.js'),
    multer = require('multer'),
    fs = require('fs');



router.get('/:id', function(req, res, next){
    res.render('uploadDocument', {reqID: req.params.id});

});

router.post('/:id', multer({dest: './uploads/'}).single('upl'), function(req, res, next){

fs.rename('./uploads/'+ req.file.filename, './uploads/' + req.params.id + "/subUploads/"+ req.file.filename + req.file.originalname);
req.file.filename = req.file.filename + req.file.originalname;



 var documentUp = new DocumentUp({
    projectNumber: req.params.id,
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
      res.render("uploadStatus", {status: status, link: "/uploadDocument/" + req.params.id})
    } else {

      status = "Document Uploaded"
      res.render("uploadStatus", {status: status, link: "/uploadDocument/" + req.params.id});
    }
  });
});


module.exports = router;
