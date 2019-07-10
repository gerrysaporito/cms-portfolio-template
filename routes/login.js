//=======================VARIABLE DECLARATIONS=======================//
var express     = require("express"),
    passport    = require("passport"),
    UserInfo    = require("../models/userInfo"),
    User        = require("../models/user"),
    router      = express.Router({mergeParams: true});

//===========================MAIN ROUTES=============================//
router.get("/login", function (req, res) {
  UserInfo.findOne({"page":"Landing"}, function(err, userInfo){
      if(err){
          console.log(err);
      } else {
        if(userInfo){
          res.render("user/login", {page: "login", userInfo:userInfo});
        } else {
          res.render("user/login", {page: "login", userInfo:null});
        }
      }
  });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req, res) {});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Successfully logged you out.");
    res.redirect("/");
})

//========================REGISTER ROUTES===========================//
router.get("/register", function(req, res){
  UserInfo.findOne({"page":"Landing"}, function(err, userInfo){
      if(err){
          console.log(err);
      } else {
        res.render("user/register", {page: "register", userInfo:userInfo});
      }
  });
});

router.post("/register", function(req, res){
    let username = {username: req.body.username};
    User.register(new User(username), req.body.password, function (err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome Gerry" /* + user.username */);
                res.redirect("/");
            });
        }
    });
});

module.exports = router;
