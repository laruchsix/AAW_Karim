const express = require("express");
const router = express.Router();
const requestManager = require("../database/databaseRequest");

//get all plannings
router.get("/planning/", (req, res) => {
    let sqlRequest = {
        name: "read-planning",
        text: 'SELECT id, name, date FROM planning;',
        values: []
    }
    requestManager.basicRequest(sqlRequest, res);
});

//add a planning
router.post("/admin/planning/", (req, res) => {
    const planning = req.body;
    let sqlRequest = {
        text: 'insert into planning (name, date)' +
            'VALUES ($1, $2);',
        values: [planning.name, planning.date]
    }
    requestManager.RequestCallback(sqlRequest, (err, result) => {
        if(err){
            console.log(err);
            res.status(403).send({
                error :err
            });
            return;
        }
        let sqlRequest = {
            name: "read-planning",
            text: 'SELECT id, name, date FROM planning;'
        }
        requestManager.basicRequest(sqlRequest, res);
    })
})

//delete a planning
router.delete("/admin/planning/:id", (req, res) => {
    const planningId = req.params.id;
    let sqlRequest = {
        text: 'DELETE FROM planning WHERE planning.id = ($1);',
        values: [planningId]
    }
    requestManager.RequestCallback(sqlRequest, (err, result) => {
        if(err){
            console.log(err);
            res.status(403).send({
                error :err
            });
            return;
        }
        let sqlRequest = {
            name: "read-planning",
            text: 'SELECT id, name, date FROM planning;'
        }
        requestManager.basicRequest(sqlRequest, res);
    })
})

module.exports = router;