const express = require("express");
const app = express();
const port = 3000;
const config = require("./config");
const api_router = require("./router/api")
const pg = require('pg');
const pgClient = new pg.Client(process.env.POSTGRESQL_ADDON_URI);
const dotenv = require("dotenv");

// server config
app.use(config.public_Path, express.static("public"));
app.use(express.json());

// the api route
app.use("/api", api_router);

// launch the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

dotenv.config();
console.log("connecting to", process.env.POSTGRESQL_ADDON_URI);

pgClient.connect();