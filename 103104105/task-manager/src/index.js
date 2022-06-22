const express = require("express");
require("./db/mongoose.js");
const userRouter = require("./router/user.js")
const taskRouter = require("./router/task.js")
const bcrypt = require("bcryptjs");
const app = express();
app.use(express.json());
app.use(userRouter)
app.use(taskRouter)

const port = process.env.PORT || 3000;

// const myfunction  = async() =>{
//   const password = "abhi123";
//   const hashPassword = await bcrypt.hash(password,8)
//   console.log(password);
//   console.log(hashPassword);
//   const isMatch = await bcrypt.compare("abhi123",hashPassword)
//  console.log(isMatch);
// }

// myfunction()
app.listen(port, () => {
  console.log("app is listening in " + port);
});
