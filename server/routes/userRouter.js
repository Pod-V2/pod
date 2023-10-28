const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', userController.getUser, userController.getUserListings,(req, res) => {
    return res.status(200).json({userInfo: res.locals.userInfo, listingInfo: res.locals.listingArr});
})


module.exports = router;