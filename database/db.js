require("dotenv").config();
const knex = require("knex")({
  client: "mysql",
  connection: {
    host:process.env.host,
    user:process.env.user,
    password:process.env.pass,
    database:process.env.db
  },
  // useNullAsDefault: true,
});


module.exports = knex
