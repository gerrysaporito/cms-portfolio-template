//=======================VARIABLE DECLARATIONS=======================//
var express             = require("express"),
    request             = require("request"),
    UserInfo            = require("../models/userInfo"),
    Work_Experience     = require("../models/work_experience"),
    router              = express.Router({mergeParams: true});

//==========================CREATE ROUTES============================//
router.get("/create", isLoggedIn, function(req, res){
  UserInfo.findOne({"page":"Landing"}, function(err, userInfo){
      if(err){
          console.log(err);
      } else {
        if(userInfo){
          res.render("create", {userInfo: userInfo, page: "create"});
        } else {
          res.render("create", {userInfo: null, page: "create"});
        }
      }
  });
});

//==========================CREATE ROUTES============================//
router.get("/edit", isLoggedIn, function(req, res){
  UserInfo.findOne({"page":"Landing"}, function(err, userInfo){
      if(err){
          console.log(err);
      } else {
        if(userInfo){
            res.render("edit", {userInfo: userInfo, page: "edit"});
        } else {
          res.render("edit", {userInfo: null, page: "edit"});
        }
      }
  });
});


//=============================FUNCTIONS=============================//
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash("error", "Please log in first.");
    res.redirect("/login");
}

module.exports = router;
