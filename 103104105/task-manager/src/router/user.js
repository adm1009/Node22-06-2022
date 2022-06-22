const express = require("express");
const User = require("../models/user.js");
const router = new express.Router();

router.get("/test", (req, res) => {
  res.send("this from user file of router");
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.post("/users/login",async (req,res)=>{
  try{
    const user = await User.findByCredentials(req.body.Email,req.body.password)
    res.send(user)
  }catch(e){
 res.status(400).send()
  }
})
router.get("/users", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(400);
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "Email", "age", "password"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(404).send({ error: "Invalid Field" });
  }
  try {
    const user = await User.findById(req.params.id);

    updates.forEach((update)=>{
      user[update] = req.body[update]
    });
    await user.save()
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!user) {
      res.status(500).send("Error:- User not present");
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;
