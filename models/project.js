var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var ProjectSchema = new mongoose.Schema({
    name: String,
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

ProjectSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Project", ProjectSchema);
