const express = require("express");
const router = express.Router();
const utils = require("../utils");
const requestManager = require("../database/databaseRequest");


router.delete("/admin/token/all", async (req, res) => {
    let sqlRequest = {
        text: 'DELETE FROM token WHERE person_id != (SELECT person_id FROM token WHERE token = $1);',
        values: [req.cookies.token.id]
    };

    let result = await requestManager.RequestAsync(sqlRequest);

    if (result.error) {
        console.log("Error while trying delete all users token");
        console.log(result.error);
        res.status(500).send({
            error: result.error
        });
    } else {
        res.send({ result : "all users was disconnected"})
    }
})


router.delete("/admin/token/admins", async (req, res) => {
    let sqlRequest = {
        text: 'DELETE FROM token ' +
            'WHERE person_id IN (' +
            '   SELECT id ' +
            '   FROM person ' +
            '   WHERE id != (' +
            '       SELECT DISTINCT person_id ' +
            '       FROM token ' +
            '       WHERE token = $1' +
            '   ) ' +
            '   AND admin = true);',
        values: [req.cookies.token.id]
    };

    let result = await requestManager.RequestAsync(sqlRequest);

    if (result.error) {
        console.log("Error while trying delete all admins token token");
        console.log(result.error);
        res.status(500).send({
            error: result.error
        });
    } else {
        res.send({ result : "all users was disconnected"})
    }
})

router.delete("/admin/token/users", async (req, res) => {
    let sqlRequest = {
        text:'DELETE FROM token ' +
            'WHERE person_id IN (' +
            '   SELECT id ' +
            '   FROM person ' +
            '   WHERE id != (' +
            '       SELECT DISTINCT person_id ' +
            '       FROM token ' +
            '       WHERE token = $1' +
            '   ) ' +
            '   AND admin = false);',
        values: [req.cookies.token.id]
    };

    let result = await requestManager.RequestAsync(sqlRequest);

    if (result.error) {
        console.log("Error while trying delete all admins token token");
        console.log(result.error);
        res.status(500).send({
            error: result.error
        });
    } else {
        res.send({ result : "all users was disconnected"})
    }
})



module.exports = router;