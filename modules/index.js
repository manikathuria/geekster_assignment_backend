const express = require("express");
const router = express.Router();

const placesRouter = require("./places");
router.use("/places", placesRouter);

module.exports = router;