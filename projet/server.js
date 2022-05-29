const express = require("express");
const app = express();
const port = 3000;
const config = require("./config");
const api_router = require("./src/api/api");
const fs = require("fs");
const dotenv = require("dotenv");
var cookieParser = require('cookie-parser');
const utils = require("./src/api/utils");

// server config
app.use(config.public_Path, express.static("public"));
app.use(config.public_Path, express.static("dist"));

app.use(express.json());

app.use(cookieParser());



// Security
app.use("/api/admin/*", async (req, res, next) => {
    let token = req.cookies ? req.cookies.token : undefined;

    if (!token || !token.id) {
        // remove the cookie
        console.log("** an unconnected person try log on /admin/ route **");
        if (token) res.clearCookie("token");
        res.status(401).send("Forbidden");
    } else {
        if (await utils.isValidAdmin(req)) {
            console.log("** the admin token is valid **")
            next();
        } else {
            console.log("** the admin token is invalid **")
            res.status(401).send("Forbidden");
        }
    }
});

app.use("/api/user/*", async (req, res, next) => {
    let token = req.cookies ? req.cookies.token : undefined;
    if (!token || !token.id) {
        // remove the cookie
        console.log("** an unconnected person try log on /user/ route **");
        if (token) res.clearCookie("token");
        res.status(401).send("Forbidden");
    } else {
        if (await utils.isValidToken(req)) {
            console.log("** the user token is valid **")
            next();
        } else {
            console.log("** the user token is invalid **")
            res.status(401).send("Forbidden");
        }
    }
});

// the api route
app.use("/api", api_router);

// able the refresh on the frontend

app.get("/*", (req, res) => {
    (process.env.MODE !== "production")
        ?res.sendFile(__dirname + "/public/indexDev.html")
        :res.sendFile(__dirname + "/public/index.html");
    /*
    fs.readFile("./public/index.html", 'utf8', async (err, html) => {
        if (err) {
            console.error(err);
        } else {
            let result = await (process.env.MODE !== "production")
                ? html.replace('js', 'http://localhost:1234/index.js')
                : html.replace('js', 'index.js');

            let result2 = await (process.env.MODE !== "production")
                ? result.replace('css', 'http://localhost:1234/index.css')
                : result.replace('css', 'index.css');

            await res.writeHead(200, {'Content-Type': 'text/html'});
            res.send(result2);
        }
    })*/
});
/*app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});*/

// launch the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
