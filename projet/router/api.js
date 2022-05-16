const express = require("express");
const router = express.Router();
const personRouter = require("./person");

router.use("/person", personRouter);

module.exports = router;

