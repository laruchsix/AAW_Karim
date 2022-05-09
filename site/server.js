const express = require("express");
const app = express();
const port = 3000;
const config = require("./config");
const api_router = require("./router/api")

// server config
app.use(config.public_Path, express.static("public"));
app.use(express.json());

// the api route
app.use("/api", api_router);

// launch the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
