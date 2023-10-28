const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");

router.get("/", listingController.getAllListings, (req, res) => {
  console.log(res.locals.listings);
  return res.status(200).json(res.locals.listings);
  // return res.status(200).json([{name: 'test'}, {name: 'test2'}]);
});

router.get("/id/:id", listingController.getListing, (req, res) => {
  return res.status(200).json(res.locals.listing);
});

router.get("/category/:category", listingController.getListingsByCategory, (req, res) => {
  return res.status(200).json(res.locals.listing);
});

router.post("/", listingController.createListing, (req, res) => {
  return res
    .status(200)
    .json({ listingid: res.locals.listingid, status: "success", message: "Successfully created new listing!" });
});

router.patch("/id/:id", listingController.updateListing, (req, res) => {
  return res.status(200).json(res.locals.updatedListing);
});

router.delete("/id/:id", listingController.deleteListing, (req, res) => {
  return res.status(200).json(res.locals.deletedListing);
});

module.exports = router;
