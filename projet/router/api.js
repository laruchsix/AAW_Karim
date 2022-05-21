const express = require("express");
const router = express.Router();
const personRouter = require("./person");
const planningRouter = require("./planning");

router.use("/person", personRouter);
router.use("/planning", planningRouter);

module.exports = router;

