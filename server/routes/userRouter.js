const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', userController.getUser, (req, res) => {
    return res.status(200).json(res.locals.userInfo);
})


module.exports = router;