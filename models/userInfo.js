var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var UserInfoSchema = new mongoose.Schema({
  page: String,
  name: String,
  opening:String,
  about: String,
  email: String,
  linkedIn: String,
  facebook: String,
  image: String,
  author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String
  }
});

UserInfoSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("UserInfo", UserInfoSchema);
