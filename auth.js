const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.authenticate = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Get User By Email
      const user = await User.findOne({ email });

      // Match Password
      bcrypt.compare(password, user.password, (err, isMatched) => {
        if (err) throw err;
        if (isMatched) {
          resolve(user);
        } else {
          reject("Authentication failed");
        }
      });
    } catch (err) {
      //Email not found
      reject("Authentical Failed");
    }
  });
};
