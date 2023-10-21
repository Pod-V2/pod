const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getAllCategories, (req, res) => {
  console.log(res.locals.listings);
  return res.status(200).json(res.locals.categories);
});

module.exports = router;