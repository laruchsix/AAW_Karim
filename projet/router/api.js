const express = require("express");
const router = express.Router();
const personRouter = require("./person");
const planningRouter = require("./Planning");
const mancheRouter = require("./Manche");
const loginRouter = require("./Login");

router.use("/person", personRouter);
router.use("/planning", planningRouter);
router.use("/manche", mancheRouter);
router.use("/", loginRouter);

module.exports = router;

