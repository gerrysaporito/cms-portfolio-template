var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var ExperienceSchema = new mongoose.Schema({
    name: String,
    sub: String,
    description: String,
    link: String,
    image: String,
    author: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        username: String
    },
});

ExperienceSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Experience", ExperienceSchema);
