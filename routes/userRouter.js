const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// post user api
router.post("/create", async (req, res) => {
  let { password, name, email } = req.body;
  const salt = await bcrypt.genSalt(10);

  password = await bcrypt.hash(password, salt);
  // console.log(password);

  const user = await new User({ name, email, password });
  const data = await user.save();
  if (data) {
    res.status(201).json({ message: "User created Successfully" });
  } else {
    res.status(501).json({ message: "User not created, Something went wrong" });
  }
});
// get user api
router.get("", async (req, res) => {
  const data = await User.find();
  // const data = await User.find().select({
  //   _id: 0,
  //   password: 0,
  // });

  if (data) {
    res.status(200).json({ message: "User ", data });
  } else {
    res.status(404).json({ message: "User not Found, Something went wrong" });
  }
  // console.log(data);
});

// login by email api
router.post("/login", async (req, res) => {
  let { name, email, password } = req.body;
  const user = await User.find({ email: req.body.email });
  // console.log(user[0].name);

  const matchPass = await bcrypt.compare(
    password,
    user[0]?.password ? user[0]?.password : "need right password"
  );

  if (!matchPass) {
    res.status(200).json({ message: "User Invalid", user });
  }
  const data = {
    email: user[0]?.email,
    name: user[0]?.name,
    password: user[0]?.password,
  };
  const token = jwt.sign(data, "SAHARA-BANU");
  console.log(token);

  res.status(200).json({ message: "Login Success", token });
  // if (user) {
  //   res.status(200).json({ message: "User Found", user });
  // } else {
  //   res.status(404).json({ message: "User Not Found", user });
  // }
  //   console.log(user);
});

router.get("/admin", async (req, res) => {
  const token = req.headers.authorization;
  console.log("admin token", token);
  const decoded = jwt.verify(token, "SAHARA-BANU");
  console.log(decoded);
  if (!decoded) {
    res.status(500).json({ message: "Request Invalid " });
  }
  res.status(200).json({ message: "I Am Admin " });
});

module.exports = router;
