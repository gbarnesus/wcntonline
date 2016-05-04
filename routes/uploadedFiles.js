var express = require('express'),
    router = express.Router(),
    DocumentUP = require(__dirname + '/../models/documentUp.js');



router.get('/', function(req, res, next){
 DocumentUp.findOne({}, function(err, documentUp){
   res.render("uploadedFiles", {document: documentUp})
   console.log()

});
});




module.exports = router;
