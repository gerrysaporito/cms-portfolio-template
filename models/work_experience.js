var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var Work_ExperienceSchema = new mongoose.Schema({
    company: String,
    date: String,
    position: String,
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

Work_ExperienceSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Work_Experience", Work_ExperienceSchema);
