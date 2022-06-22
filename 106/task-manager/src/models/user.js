const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  Email: {
    type: String,
    unique:true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email Error");
      }
    },
  },
  age: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("age Error");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("password not to be password");
      }
    },
  },
});
userSchema.statics.findByCredentials= async (Email,password)=>{
    const user = await User.findOne({Email:Email});

    if(!user){
        throw new Error("unable to login")
    };

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("unable to login")
    }
}
userSchema.pre("save", async function (next) {
  const user = this;
//   console.log("just before saving");
if(user.isModified("password")){
    user.password = await bcrypt.hash(user.password,8)
}
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
