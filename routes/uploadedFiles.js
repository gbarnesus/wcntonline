var express = require('express'),
    router = express.Router(),
    DocumentUP = require(__dirname + '/../models/documentUp.js');



router.get('/', function(req, res, next){
 DocumentUp.find({}, function(err, documentUp){
   console.log(documentUp)
   res.render("uploadedFiles", {docs: documentUp})

});
});




module.exports = router;
