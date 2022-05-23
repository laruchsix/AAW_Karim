const requestManager = require("../database/databaseRequest");

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

module.exports = {
    verifyParamArray,
    getUserTokenByUsername,
    removeToken
}



