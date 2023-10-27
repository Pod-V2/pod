const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.verifyUser, authController.setCookie,(req, res) => {
  return res.sendStatus(200)
});

router.post("/register", authController.createUser, (req, res) => {
 return res.sendStatus(200);
});

module.exports = router;
