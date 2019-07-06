//=======================VARIABLE DECLARATIONS=======================//
var express             = require("express"),
    request             = require("request"),
    UserInfo            = require("../models/userInfo"),
    router              = express.Router({mergeParams: true});

//==========================USERINFO ROUTES===========================//
router.get("/create/userInfo", isLoggedIn, function(req, res){
  UserInfo.find({}, function(err, allUserInfo){
      if(err){
          console.log(err);
      } else {
        if(allUserInfo){
          res.render("userInfo/createUserInfo", {userInfo: allUserInfo, page: "userInfo/createUserInfo"});
        } else {
          res.render("userInfo/createUserInfo", {userInfo: null, page: "userInfo/createUserInfo"});
        }
      }
  });
});

router.get("/edit/userInfo", isLoggedIn, function(req, res){
    UserInfo.find({}, function(err, allUserInfo){
        if(err){
            console.log(err);
        } else {
          if(allUserInfo){
            res.render("userInfo/editUserInfos", {userInfo: allUserInfo, page: "userInfo/editUserInfos"});
          } else {
            res.render("userInfo/editUserInfos", {userInfo: null, page: "userInfo/editUserInfos"});
          }
        }
    });
})

router.post("/create/userInfo", isLoggedIn, function(req, res){
    let userInfo = req.body.userInfo;
        userInfo["author"] = {
            id: req.user._id,
            username: req.user.username
        }

    UserInfo.create(userInfo, function(err, newUserInfo){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            res.redirect("/create/userInfo")
        } else {
            req.flash("success", "Successfully created new userInfo post.");
            res.redirect("/edit/userInfo");
        }
    });
});

router.get("/edit/userInfo/:id", isLoggedIn, function(req, res) {
    UserInfo.findById(req.params.id, function(err, foundUserInfo){
      if(err){
        res.redirect("/edit/userInfo");
      } else {
        if(foundUserInfo){
          res.render("userInfo/editUserInfo", {userInfo: foundUserInfo});
        } else {
          res.render("userInfo/editUserInfo", {userInfo: null});
        }
      }
    });
});

router.put("/edit/userInfo/:id", function(req, res) {
    UserInfo.findByIdAndUpdate(req.params.id, req.body.userInfo, function(err, updatedUserInfo) {
      if(err){
        res.redirect("/edit/userInfo/" + req.params.id);
      } else {
        res.redirect("/edit/userInfo");
      }
    });
  });

router.delete("/edit/userInfo/:id", isLoggedIn, function(req, res){
    UserInfo.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }
        res.redirect("/edit/userInfo");
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
