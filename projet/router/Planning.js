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

module.exports = router;