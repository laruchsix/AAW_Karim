const express = require("express");
const router = express.Router();
const requestManager = require("../database/databaseRequest");

//get all subscribes plannings and manches for a user find by tokenID
router.get("/user/manches/:id", (req, res) => {
    const tokenData = req.params.id;
    let sqlRequest = {
        name: "read-person-data",
        text: 'SELECT inscription.planning_id, inscription.manche_id, inscription.person_id, planning.name as name_p, manche.name as name_m, planning.date ' +
            ' FROM (inscription INNER JOIN planning ON planning.id = inscription.planning_id) ' +
            ' INNER JOIN manche ON manche.id = inscription.manche_id ' +
            ' WHERE inscription.person_id = (SELECT token.person_id FROM token WHERE token.token = $1)',
        values: [tokenData]
    }
    requestManager.basicRequest(sqlRequest, res);
});

//delete a manche from a planning for a user
router.delete("/user/:idM/:idP/:idT", (req, res) => {
    const ids = req.params;
    let sqlRequest = {
        text: 'DELETE FROM inscription WHERE inscription.planning_id = ($1) AND inscription.manche_id = $2 AND inscription.person_id = (SELECT person_id FROM token WHERE token.token = $3);',
        values: [ids.idP, ids.idM, ids.idT]
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
            name: "read-person-data",
            text: 'SELECT inscription.planning_id, inscription.manche_id, inscription.person_id, planning.name as name_p, manche.name as name_m, planning.date ' +
                ' FROM (inscription INNER JOIN planning ON planning.id = inscription.planning_id) ' +
                ' INNER JOIN manche ON manche.id = inscription.manche_id ' +
                ' WHERE inscription.person_id = (SELECT token.person_id FROM token WHERE token.token = $1)',
            values: [ids.idT]
        }
        requestManager.basicRequest(sqlRequest, res);
    })
})

module.exports = router;