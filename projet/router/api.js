const express = require("express");
const router = express.Router();
const personRouter = require("./person");
const planningRouter = require("./Planning");
const mancheRouter = require("./Manche");

router.use("/person", personRouter);
router.use("/planning", planningRouter);
router.use("/manche", mancheRouter);

module.exports = router;

