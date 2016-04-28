var express = require('express'),
    router = express.Router();


router.get('/:id', function(req, res, next){
    res.render('projectDocs', {reqID: req.params.id});
});

module.exports = router;
