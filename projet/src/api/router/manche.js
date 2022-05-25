const express = require("express");
const router = express.Router();
const requestManager = require("../database/databaseRequest");


router.get("/manche/:id", (req, res) => {
    if (req.params.id === undefined) {
        res.status(400).send({
            error: "require the planning id"
        });
    }

    let sqlRequest = {
        name: "read-manche-" + req.params.id,
        text: 'SELECT * FROM manche WHERE planning_id = ($1) ORDER BY ordre;',
        values: [req.params.id]
    }

    requestManager.basicRequest(sqlRequest, res);
});

module.exports = router;