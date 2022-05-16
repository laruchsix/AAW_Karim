const express = require("express");
const router = express.Router();
const pool = require("../datbase/database");

/**
 * get all persons
 */
router.get("/", (req, res) => {
    pool.query("SELECT * FROM person;", (err, result) => {
        if (err) {
            res.status(500).send({
                error: err
            });
        }
        res.send(result.rows);
    });
});

/**
 * add a new person
 */
router.post("/", async (req, res) => {
    // get params
    let { first_name, last_name} = req.body;
    console.log("post person : ", req.body);

    let string_request = "INSERT INTO person (\"first_name\", \"last_name\") VALUES ('" + first_name + "', '" + last_name + "');";

    console.log("string request = " + string_request);
    const result = await pool.query(string_request);
    res.send(result);

});

/**
 * get a person by an id
 */
router.get("/:id", (req, res) => {
});

/**
 * delete a person by an id
 */
router.delete("/:id", (req, res) => {
});

module.exports = router;
