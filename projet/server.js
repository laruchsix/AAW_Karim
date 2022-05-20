const express = require("express");
const app = express();
const port = 3000;
const config = require("./config");
const api_router = require("./router/api");
const fs = require("fs");

// server config
app.use(config.public_Path, express.static("public"));
app.use(express.json());

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

/*
app.use("/test", async (req, res) => {
    try {
        const persons = await pool.query("SELECT * FROM person;");

        res.send(persons);
    } catch (error) {
        console.error(error.message);
    }
});*/
app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
// launch the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
