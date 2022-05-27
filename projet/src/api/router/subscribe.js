const express = require("express");
const router = express.Router();
const requestManager = require("../database/databaseRequest");


router.get("/subscribe", (req, res) => {
    if (req.params.planning_id === undefined || req.params.manche_id) {
        res.status(400).send({
            error: "require the planning id and the the round id"
        });
    }

    let sqlRequest = {
        name: "read-subscribe" + req.params.id,
        text: 'SELECT * FROM inscription WHERE planning_id = ($1) AND manche_id = ($2);',
        values: [req.params.planning_id, req.params.manche_id]
    }

    requestManager.basicRequest(sqlRequest, res);
});

module.exports = router;