const express = require("express");
const app = express();
const port = 3000;
const config = require("./config");
const api_router = require("./src/api/api");
const fs = require("fs");
var cookieParser = require('cookie-parser');

// server config
app.use(config.public_Path, express.static("public"));
app.use(express.json());
app.use(cookieParser());

// the api route
app.use("/api", api_router);
/*
app.get("/*", (req, res) => {
    fs.readFile("./dist/index.html", 'utf8', (err, html) => {
        if (err) {
            console.error(err);
        } else {
            let result = (process.env.MODE !== "production")
                ? html.replace('$js', 'http://localhost:3000/index.js')
                : html.replace('$js', './index.js');

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.send(result);
        }
    })

});*/

// Security
app.use("/api/admin/*", async (req, res, next) => {
    let token = req.cookies ? req.cookies.token : undefined;

    if (!token || !token.id) {
        // remove the cookie
        if (token) res.clearCookie("token");
        res.render("/login");
    } else {
        let  tokenId = token.id;
        next();
        // TODO : check if the token is valid and the user is admin
    }
});

// launch the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
