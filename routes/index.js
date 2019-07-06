//=======================VARIABLE DecLARATIONS=======================//
var express             = require("express"),
    request             = require("request"),
    WorkExperience      = require("../models/work_experience"),
    UserInfo            = require("../models/userInfo"),
    Experience            = require("../models/experience"),
    router              = express.Router({mergeParams: true});

//===========================MAIN ROUTES=============================//
router.get("/", function(req, res){
    WorkExperience.find({}, function(err, allWork_experience){
        if(err){
            console.log(err);
        } else {
            UserInfo.findOne({"page":"Landing"}, function(err, userInfo){
                if(err){
                    console.log(err);
                } else {
                  Experience.find({}, function(err, allExperiences){
                    if(err) {
                        console.log(err);
                    } else {
                      if(allWork_experience && userInfo && allExperiences) {
                        res.render("landing", {
                          experiences: allExperiences,
                          workExperiences: allWork_experience,
                          userInfo: userInfo,
                          page: "landing"
                        });
                      } else {
                        res.render("landing", {
                          experiences: null,
                          workExperiences: null,
                          userInfo: null,
                          page: "landing"
                        });
                      }
                    }
                  });
                }
            });
        }
    });
});

module.exports = router;
