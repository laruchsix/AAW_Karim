const express = require("express");
const router = express.Router();
const pool = require("../database/database");

/**
 * get all persons
 */
router.get("/admin/person", (req, res) => {
    let sqlRequest = {
        text: "SELECT id, first_name, last_name, email, admin, connections  " +
            "FROM person " +
            "LEFT JOIN " +
            "(  SELECT person_id, COUNT(*) AS connections" +
            "   FROM token " +
            "   WHERE expired_date > $1 " +
            "   GROUP BY person_id )" +
            " AS tokens " +
            "ON tokens.person_id = person.id;",
        values: [new Date()]
    }

    pool.query(sqlRequest, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                error: err
            });
            return;
        }
        res.send(result.rows);
    });
});

/**
 * add a new person
 */
router.post("/person/", async (req, res) => {
    // get params
    let { first_name, last_name} = req.body;
    console.log("post person : ", req.body);

    let string_request = "INSERT INTO person (\"first_name\", \"last_name\") VALUES ('" + first_name + "', '" + last_name + "');";

    console.log("string request = " + string_request);
    const result = await pool.query(string_request);
    res.send(result);

});

module.exports = router;
