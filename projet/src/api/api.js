const express = require("express");
const router = express.Router();
const personRouter = require("./router/person");
const planningRouter = require("./router/planning");
const mancheRouter = require("./router/manche");
const loginRouter = require("./router/Login");

router.use("/person", personRouter);
router.use("/planning", planningRouter);
router.use("/manche", mancheRouter);
router.use("/", loginRouter);

module.exports = router;

