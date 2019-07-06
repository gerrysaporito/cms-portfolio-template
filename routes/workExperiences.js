//=======================VARIABLE DECLARATIONS=======================//
var express             = require("express"),
    request             = require("request"),
    UserInfo            = require("../models/userInfo"),
    WorkExperience      = require("../models/work_experience"),
    router              = express.Router({mergeParams: true});

//===========================WORK ROUTES=============================//
router.get("/create/work-experience", isLoggedIn, function(req, res){
  UserInfo.findOne({"page":"Landing"}, function(err, userInfo){
      if(err){
          console.log(err);
      } else {
        if(userInfo){
          res.render("workExperiences/createWorkExperience", {
              userInfo: userInfo,
              page: "workExperiences/createWorkExperience"
          });
        } else {
          res.render("workExperiences/createWorkExperience", {
              userInfo: null,
              page: "workExperiences/createWorkExperience"
          });
        }
      }
  });
});

router.get("/edit/work-experiences", isLoggedIn, function(req, res){
    WorkExperience.find({}, function(err, allWorkExperiences){
        if(err){
            console.log(err);
            res.redirect("/edit/work-experiences");
        } else {
          UserInfo.findOne({"page":"Landing"}, function(err, userInfo){
              if(err){
                  console.log(err);
              } else {
                if(userInfo && allWorkExperiences){
                  res.render("workExperiences/editWorkExperiences", {
                      userInfo: userInfo,
                      workExperiences: allWorkExperiences,
                      page: "workExperiences/editWorkExperiences"
                  });
                } else {
                  res.render("workExperiences/editWorkExperiences", {
                      userInfo: null,
                      workExperiences: null,
                      page: "workExperiences/editWorkExperiences"
                  });
                }
              }
          });
        }
    });
});

router.post("/create/work-experience", isLoggedIn, function(req, res){
    let work_experience = req.body.work_experience;
        work_experience["author"] = {
            id: req.user._id,
            username: req.user.username
        }

    WorkExperience.create(work_experience, function(err, newWorkExperience){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            res.redirect("/create/work")
        } else {
            console.log("Successfully created new work post.");
            req.flash("success", "Successfully created new work post.");
            res.redirect("/edit/work-experiences");
        }
    });
});

router.get("/edit/work-experiences/:id", isLoggedIn, function(req, res) {
    WorkExperience.findById(req.params.id, function(err, foundWorkExperience){
      if(err){
        res.redirect("/edit/work-experiences");
      } else {
        UserInfo.findOne({"page":"Landing"}, function(err, userInfo){
            if(err){
                console.log(err);
            } else {
              if(userInfo && foundWorkExperience){
                res.render("workExperiences/editWorkExperience", {
                    userInfo: userInfo,
                    workExperience: foundWorkExperience,
                    page: "workExperiences/editWorkExperience"
                });
              } else {
                res.render("workExperiences/editWorkExperience", {
                    userInfo: null,
                    workExperience: null,
                    page: "workExperiences/editWorkExperience"
                });
              }
            }
        });
      }
    });
});

router.put("/edit/work-experiences/:id", function(req, res) {
    WorkExperience.findByIdAndUpdate(req.params.id, req.body.work_experience, function(err, updatedWorkExperience) {
      if(err){
        res.redirect("/edit/work-experiences/" + req.params.id);
      } else {
        res.redirect("/edit/work-experiences");
      }
    });
  });

  router.delete("/edit/work-experiences/:id", isLoggedIn, function(req, res){
    WorkExperience.findByIdAndRemove(req.params.id, function(err){
      if(err){
        console.log(err);
      }
      res.redirect("/edit/work-experiences");
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
