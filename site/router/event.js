const express = require("express");
const router = express.Router();
const {v4} = require("uuid");

let events = [
    {
        id: 1,
        title: "Event 1",
        date: "2020-01-01",
    },
    {
        id: 2,
        title: "Event 2",
        date: "2020-01-02",
    },
    {
        id: 3,
        title: "Event 3",
        date: "2020-01-03",
    }
];

router.get("/", (req, res) => {
   res.send(events)
});

router.get("/:id", (req, res) => {
    let ev = events.filter(event => event.id === req.params.id);
    res.send(ev);
});

router.post("/", (req, res)=>{
    const event= req.body;
    console.log(event);
    event.id = v4();
    events.push(event);
    res.send(events);
})

module.exports = {
    eventRouter:router,
    events
};
