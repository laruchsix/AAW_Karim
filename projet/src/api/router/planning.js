const express = require("express");
const router = express.Router();
const requestManager = require("../database/databaseRequest");


router.get("/", (req, res) => {
    let sqlRequest = {
        name: "read-planning",
        text: 'SELECT id, name, date FROM planning;',
        values: []
    }
    requestManager.basicRequest(sqlRequest, res);
});

router.post("/", (req, res) => {
    const person = req.body;
    let sqlRequest = {
        name: "read-events",
        text: 'insert into person (name, email, password)' +
            'VALUES ($1, $2, $3);',
        values: [person.name, person.email, person.password]
    }
    requestManager.query(sqlRequest, (err, result) => {
        if(err){
            res.status(500).send({
                error :err
            });
        }
        res.send(result.rows);
    })
})

module.exports = router;