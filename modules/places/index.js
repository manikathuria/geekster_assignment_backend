const express = require("express");
const router = express.Router();
const controller = require('./controller');
router.get('/getRestaurants', controller.getRestaurants);

module.exports = router;