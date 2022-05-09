const express = require("express");
const router = express.Router();

let events = [];

router.get("/", (req, res) => {
   res.send({
      message: "Welcome to the event router"
   })
});

module.exports = {
    eventRouter:router,
    events
};
