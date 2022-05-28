const express = require('express');
const router = express.Router();
const utils = require("../utils");
const requestManager = require("../database/databaseRequest");
const dotenv = require("dotenv");

router.delete("/logout", (req, res) => {
    console.log(req.cookies)
    if (req.cookies.token === undefined) {
        res.send({
            message: "You are not logged in"
        });
    } else {
        console.log((utils.removeToken(req.cookies.token.id)) ? "The token has been deleted !" : "The token has not been deleted !");

        res.clearCookie("token");
        res.send({
            message: "You are now logged out"
        });
    }
});

router.post("/login", async (req, res) => {
    let {name, password} = req.body;

    let result = await requestManager.RequestAsync({
        text: 'select * from person where email=($1) and password=($2);',
        values: [name, password]
    });

    if (result.error) {
        console.log("Error while trying to log in");
        res.status(500).send({
            error: result.error
        });
    } else {
        if (result.result.rows.length === 0) {
            res.send({
                error: "wrong username or password"
            })
        } else {
            const now = new Date();
            const expirationDate = new Date(now.getTime() + (process.env.TOKEN_DURATION_IN_SECONDS * 1000) );
            console.log(expirationDate)
            let user = result.result.rows[0];

            result = await requestManager.RequestAsync({
                text: 'INSERT INTO token ("person_id", "expired_date") VALUES (($1), ($2)) RETURNING token;',
                values: [user.id, expirationDate]
            });

            if (result.error) {
                console.log("Error while trying insert token into the database");
                console.log(result)
                res.status(500).send({
                    error: result.error
                });
            } else {
                // creat the cookie
                let tokenContent = {
                    id : result.result.rows[0].token,
                    name : user.last_name,
                    email : user.email,
                    admin : user.admin
                };
                console.log(tokenContent);
                res.cookie("token", tokenContent);

                res.send(tokenContent);
            }
        }
    }
});


module.exports = router;