const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");

// post user api
router.post("/create", async (req, res) => {
  let { password, name, email } = req.body;
  // let pass = password;
  password = bcrypt.hash(password, 10, function (err, hash) {
    console.log(password, "hello", hash);
  });

  // const user = await new User(req.body);
  // const data = await user.save();
  // if (data) {
  //   res.status(201).json({ message: "User created Successfully" });
  // } else {
  //   res.status(501).json({ message: "User not created, Something went wrong" });
  // }
});
// get user api
router.get("", async (req, res) => {
  const data = await User.find().select({
    _id: 0,
    password: 0,
  });
  if (data) {
    res.status(200).json({ message: "User ", data });
  } else {
    res.status(404).json({ message: "User not Found, Something went wrong" });
  }
  console.log(data);
});

// login by email api
router.post("/login", async (req, res) => {
  const user = await User.find({ email: req.body.email });
  if (user) {
    res.status(200).json({ message: "User Found", user });
  } else {
    res.status(404).json({ message: "User Not Found", user });
  }
  //   console.log(user);
});

module.exports = router;
