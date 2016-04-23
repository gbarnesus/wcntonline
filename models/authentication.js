

exports.validateUser = function(req, res, next) {
  if (req.session && req.session.user) {
  User.findOne({email: req.session.user.email}, function(err, user){
    if(user) {
      req.user = user;
      delete req.user.password;
      req.session.user = req.user;
      res.locals.user = req.user;
    }
    next();
  });
} else {
  next();
};
};

exports.validateAdmin = function(req, res, next) {
  if (req.admin && req.admin.user) {
    User.findOne({email: req.admin.user.email}, function(err, user){
      if(user) {
        req.admin = user;
        delete req.admin.password;
        req.admin.user = req.admin;
        res.locals.user = req.admin;
        req.user = user;
        delete req.user.password;
        req.session.user = req.user;
        res.locals.user = req.user;
      }
      next();
    });
  } else {
    next();
  }

};
