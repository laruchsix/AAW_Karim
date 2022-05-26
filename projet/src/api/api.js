const express = require("express");
const router = express.Router();
const personRouter = require("./router/person");
const planningRouter = require("./router/planning");
const mancheRouter = require("./router/manche");
const loginRouter = require("./router/Login");
const registerRouter = require("./router/Register");

router.use("/", personRouter);
router.use("/", planningRouter);
router.use("/", mancheRouter);
router.use("/", loginRouter);
router.use("/", registerRouter);

module.exports = router;

