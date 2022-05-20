const express = require("express");
const router = express.Router();
const {v4} = require("uuid");

let persons = [
    {
        id: 1,
        firstName: "Remousse",
        lastName: "Mousse",
        event: "1",
    },
    {
        id: 2,
        firstName: "Bibo",
        lastName: "Rucher",
        event: "3",
    },
    {
        id: 3,
        firstName: "Jo",
        lastName: "Lenglet",
        event: "2",
    }
];

router.get("/", (req, res) => {
    res.send(persons)
});

router.get("/:id", (req, res) => {
    let ev = persons.filter(person => person.id === req.params.id);
    res.send(ev);
});

//http://localhost:3000/api/person/?firstName=Remousse&lastName=Mousse
router.get("/", (req, res) => {
    const {firstName, lastName} = req.query;
    res.send(persons.filter(p=>p.firstName.includes(firstName) || p.lastName.includes(lastName)));
});


router.post("/", (req, res) => {
    const person = req.body;
    console.log(person);
    person.id = v4();
    persons.push(person);
    res.send(persons);
})

router.delete("/:id", (req, res) => {
    console.log(req.params);
    persons = persons.filter(p=> ""+p.id !== req.params.id)
    res.send(persons);
});

module.exports = {
    personRouter:router,
    persons
};
