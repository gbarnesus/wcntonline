var express = require('express'),
    router = express.Router();
    Project = require(__dirname + '../../../models/project.js'),
    Punchlist = require(__dirname + '../../../models/punchlist.js')


    router.get('/:id', function(req, res){
        Punchlist.find({"projectNumber": req.params.id}, function(err, punchlist){

        res.render('punchlist', {punchlists: punchlist, reqID: req.params.id});

      });
      });
module.exports = router;
