const express = require("express");
const router = express.Router();

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
        firstName: "Lenglet",
        lastName: "Jo",
        event: "2",
    }
];

router.get("/all", (req, res) => {
    res.send(persons)
});


//http://localhost:3000/api/person/?firstName=Remousse&lastName=Mousse
router.get("/", (req, res) => {
    const {firstName, lastName} = req.query;
    res.send(persons.filter(p=>p.firstName.includes(firstName) || p.lastName.includes(lastName)));
});


router.post("/", (req, res) => {
    const person = req.body;
    person.id = getNextId();
    persons.push(person);
    res.send(persons);
})

router.delete("/:id", (req, res) => {
    persons = persons.filter(p=>p.id !== Number(req.params.id))
    res.send(persons);
});

module.exports = {
    personRouter:router,
    persons
};
