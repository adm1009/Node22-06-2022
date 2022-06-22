const express = require("express");
require("./db/mongoose.js");
const userRouter = require("./router/user.js")
const taskRouter = require("./router/task.js")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
// app.use((req,res,next)=>{
//   console.log(req.method,req.path);
//   next();
// })
// app.use((req,res,next)=>{
//   if(req.method === "GET"){
//       res.send("GET request disabled")
//   }else{
//     next();
//   }
// })
// app.use((req,res,next)=>{
//   res.status(503).send("site is currently unavailable")
// })
app.use(userRouter)
app.use(taskRouter)

const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log("app is listening in " + port);
});
