const express = require("express");
const router = express.Router();
const {eventRouter} = require("./event");
const {personRouter} = require("./person");

router.use("/event", eventRouter);
router.use("/person", personRouter);

module.exports = router;

