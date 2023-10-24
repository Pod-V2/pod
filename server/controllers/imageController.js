require("dotenv").config();
const uploadImage = require("../config/google-cloud");
const imageController = {};
const fileType = require('file-type')
/**
 * Upload image and receive URL from cloud storage
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
imageController.upload = async (req, res, next) => {
  try {
    console.log("imageController.upload")

    // Get file extension of uploaded image
    const file = req.body;
    const fileInfo = fileType(req.body);
    const validImageTypes = ["jpg", "jpeg", "png"];
    if (!file || !validImageTypes.includes(fileInfo.ext)) {
      return next({
        log: `imageController.upload - invalid file type supplied`,
        message: {
            err: "Invalid image file type."
        },
      });
    }

    // Upload image to Google Cloud Storage and get image URL
    const imageUrl = await uploadImage(req.body, fileInfo);
    console.log(imageUrl);
    res.locals.url = imageUrl;
    return next();
  } catch (e) {
    return next({
      log: `imageController.upload - Cloud Upload ERROR: ${e}`,
      message: {
        err: "Error in imageController.upload. Check server logs",
      },
    });
  }
};

module.exports = imageController;
