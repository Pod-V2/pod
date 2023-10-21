const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const imageController = require("../controllers/imageController");

router.get("/:listingId", imageController.upload, (req, res, next) => {
  const { url } = res.locals;
  return res.status(200).json(url);
});

router.post(
  "/",
  bodyParser.raw({
    type: ["image/jpg", "image/jpeg", "image/png"],
    limit: "5mb",
  }),
  imageController.upload,
  (req, res, next) => {
    return res.json({ url: res.locals.url }).status(200);
  }
);

module.exports = router;
