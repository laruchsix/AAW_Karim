const express = require("express");
const router = express.Router();
const personRouter = require("./router/person");
const planningRouter = require("./router/planning");
const mancheRouter = require("./router/manche");
const loginRouter = require("./router/Login");
const registerRouter = require("./router/Register");
const subscribeRouter = require("./router/subscribe");
const tokenRouter = require("./router/Token");
const userRouter = require("./router/user");

router.use("/", personRouter);
router.use("/", planningRouter);
router.use("/", mancheRouter);
router.use("/", loginRouter);
router.use("/", registerRouter);
router.use("/", subscribeRouter);
router.use("/", tokenRouter);
router.use("/", userRouter);

module.exports = router;

