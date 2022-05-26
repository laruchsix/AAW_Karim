const express = require('express');
const router = express.Router();
const utils = require("../utils");
const requestManager = require("../database/databaseRequest");
const dotenv = require("dotenv");

router.post("/register", async (req, res) => {
    let {lastname, firstname, email, password} = req.body;

    let result = await requestManager.RequestAsync({
        text: 'select * from person where email=($1)',
        values: [email]
    });

    if (result.error) {
        console.log("Error while trying to log in");
        res.status(500).send({
            error: result.error
        });
    } else {
        if (result.result.rows.length > 0) {
            res.send({
                error: "email already used"
            })
        } else {
            result = await requestManager.RequestAsync({
                text: 'INSERT INTO person (last_name, first_name, email, password) VALUES ($1, $2, $3, $4)',
                values: [lastname, firstname, email, password]
            });

            if (result.error) {
                console.log("Error while trying insert user into the database");
                console.log(result)
                res.status(500).send({
                    error: result.error
                });
            } else {
                res.send({
                    success: "user created"
                });
            }
        }
    }
});

module.exports = router;