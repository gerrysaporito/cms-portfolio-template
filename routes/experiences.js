//=======================VARIABLE DECLARATIONS=======================//
var express             = require("express"),
    request             = require("request"),
    UserInfo            = require("../models/userInfo"),
    Experience          = require("../models/experience"),
    router              = express.Router({mergeParams: true});

//===========================EXPERIENCE ROUTES=============================//
router.get("/create/experience", isLoggedIn, function(req, res){
  UserInfo.findOne({"page":"Landing"}, function(err, userInfo){
      if(err){
          console.log(err);
      } else {
        if(userInfo){
          res.render("experiences/createExperience", {
              userInfo: userInfo,
              page: "experiences/createExperience"
          });
        } else {
          res.render("experiences/createExperience", {
              userInfo: null,
              page: "experiences/createExperience"
          });
        }
      }
  });
});

router.get("/edit/experiences", isLoggedIn, function(req, res){
    Experience.find({}, function(err, allExperiences){
        if(err){
            console.log(err);
            res.redirect("/edit/experiences");
        } else {
          UserInfo.findOne({"page":"Landing"}, function(err, userInfo){
              if(err){
                  console.log(err);
              } else {
                if(userInfo && allExperiences){
                  res.render("experiences/editExperiences", {
                      userInfo: userInfo,
                      experiences: allExperiences,
                      page: "experiences/editExperiences"
                  });
                } else {
                  res.render("experiences/editExperiences", {
                      userInfo: null,
                      experiences: null,
                      page: "experiences/editExperiences"
                  });
                }
              }
          });
        }
    });
});

router.post("/create/experience", isLoggedIn, function(req, res){
    let experience = req.body.experience;
        experience["author"] = {
            id: req.user._id,
            username: req.user.username
        }

    Experience.create(experience, function(err, newExperience){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            res.redirect("/create/experience")
        } else {
            console.log("Successfully created new experience post.");
            req.flash("success", "Successfully created new experience post.");
            res.redirect("/edit/experiences");
        }
    });
});

router.get("/edit/experiences/:id", isLoggedIn, function(req, res) {
    Experience.findById(req.params.id, function(err, foundExperience){
      if(err){
        res.redirect("/edit/experiences");
      } else {
        UserInfo.findOne({"page":"Landing"}, function(err, userInfo){
            if(err){
                console.log(err);
            } else {
              if(userInfo && foundExperience){
                res.render("experiences/editExperience", {
                    userInfo: userInfo,
                    experience: foundExperience,
                    page: "experiences/editExperience"
                });
              } else {
                res.render("experiences/editExperience", {
                    userInfo: null,
                    experience: null,
                    page: "experiences/editExperience"
                });
              }
            }
        });
      }
    });
});

router.put("/edit/experiences/:id", function(req, res) {
    Experience.findByIdAndUpdate(req.params.id, req.body.experience, function(err, updatedExperience) {
      if(err){
        res.redirect("/edit/experiences/" + req.params.id);
      } else {
        res.redirect("/edit/experiences");
      }
    });
  });

  router.delete("/edit/experiences/:id", isLoggedIn, function(req, res){
    Experience.findByIdAndRemove(req.params.id, function(err){
      if(err){
        console.log(err);
      }
      res.redirect("/edit/experiences");
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
