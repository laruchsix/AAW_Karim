const requestManager = require("./database/databaseRequest");

const verifyParamArray = (params, names, res) => {
    for (let i = 0; i < params.length; i++) {
        if (params[i] === undefined && params[i] === "") {
            res.status(400).send({
                error: "missing parameter ${names[i]}"
            });
            return false;
        }
    }
}

const getUserTokenByUsername = (userName) => {
    let sqlRequest = {
        name: "read-token-"+userName,
        text: 'SELECT * FROM token JOIN (SELECT id FROM person WHERE name = ($1)) ON token.personId = ;',
        values: [userName]
    }

    return requestManager.RequestAsync(sqlRequest);
}

const removeToken = async (tokenId) => {
    let sqlRequest = {
        text : "DELETE FROM token WHERE id = ($1);",
        values: [tokenId]
    }

    let result = await requestManager.RequestAsync(sqlRequest);

    if (result.error) {
        return false;
    } else {
        return true;
    }
};

const isValidToken = async (req) => {
    let token = req.cookies.token;
    let sqlRequest = {
        text : "SELECT * FROM token WHERE token = ($1) AND expired_date > ($2);",
        values: [token.id, new Date()]
    }

    let result = await requestManager.RequestAsync(sqlRequest);


    if (result.error || result.result.rows.length === 0) {
        return false;
    } else {
        return true;
    }
};

const isValidAdmin = async (req) => {
    let token = req.cookies.token;
    let sqlRequest = {
        text : "SELECT * FROM token, person " +
            "WHERE person.id = token.person_id " +
            "AND token.token = ($1) " +
            "AND expired_date > ($2)" +
            "AND person.admin = true;",
        values: [token.id, new Date()]
    }

    let result = await requestManager.RequestAsync(sqlRequest);
    if (result.error || result.result.rows.length === 0) {
        return false;
    } else {
        return true;
    }
};

module.exports = {
    verifyParamArray,
    getUserTokenByUsername,
    removeToken,
    isValidToken,
    isValidAdmin
}



