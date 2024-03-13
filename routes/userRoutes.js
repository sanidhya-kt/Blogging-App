const express = require("express");
const User = require("../models/userModels");

const router = express.Router();

// signin routes
router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchedPasswordAndGenerateToken(email, password); // matchedPassword : userSchema virtual function
    
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      Error: "Incorrect email and password",
    });
  }
});

// signup routes
router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("signin");
});

// logout
router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
