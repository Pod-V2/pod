const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");
const cartController = require("../controllers/cartController");

router.get("/", listingController.getAllListings, (req, res) => {
  console.log(res.locals.listings);
  return res.status(200).json(res.locals.listings);
});

router.get("/userlisting", listingController.getListing, (req, res) => {
  console.log('> hello from /api/listing/:id route');
  return res.status(200).json(res.locals.listing);
});

router.post("/", listingController.createListing, (req, res) => {
  return res
    .status(200)
    .json({ status: "success", message: "Successfully created new listing!" });
});

router.patch("/", cartController.updateListingOfUserCart, (req, res) => {
  return res.status(200).json("Updated listingids of user cart");
});

router.patch("/id/:id", listingController.updateListing, (req, res) => {
  return res.status(200).json(res.locals.updatedListing);
});

router.delete("/id/:id", listingController.deleteListing, (req, res) => {
  return res.status(200).json(res.locals.deletedListing);
});

module.exports = router;
