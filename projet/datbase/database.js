// connect to postgresql database ith pool
const pg = require('pg');
const dotenv = require("dotenv");

// Initialisation de dotenv permettant la lecture en local dans le fichier .env
dotenv.config();
console.log("connecting to", process.env.POSTGRESQL_ADDON_URI);

// Initialisation de la config de la base de données
const pgClient = new pg.Client(process.env.POSTGRESQL_ADDON_URI);
// Connection à la base de données
pgClient.connect();

module.exports = pgClient;


