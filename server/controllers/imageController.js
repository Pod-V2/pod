require("dotenv").config();
const uploadImage = require("../config/google-cloud");
const imageController = {};

/**
 * Upload image and receive URL from cloud storage
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
imageController.upload = async (req, res, next) => {
  try {
    uploadImage(req.body)
    res.locals.url = "dummyURL";
    return next();
  } catch (e) {
    console.error(e)
    return next(e);
  }
};

module.exports = imageController;
