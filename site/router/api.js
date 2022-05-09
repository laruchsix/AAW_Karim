const express = require("express");
const router = express.Router();
const {eventRouter} = require("./event");
//const {person} = require("./person");

router.use("/event", eventRouter);
//router.use("/person", person);

module.exports = router;

