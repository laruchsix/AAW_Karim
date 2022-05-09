const express = require("express");
const app = express();
const port = 3000;
const config = require("./config");
const api_router = require("./router/api")

app.use(config.public_Path, express.static("public"));
app.use(express.json());

app.use("/api", api_router);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
