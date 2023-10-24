const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const passport = require("passport");

router.post("/login", authController.verifyUser, (req, res) => {
  return res.sendStatus(200);
});

router.post("/register", authController.createUser, (req, res) => {
 return res.sendStatus(200);
});

module.exports = router;
