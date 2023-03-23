require("dotenv").config();

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "127.0.0.1",
      port: 5432,
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    },
  },
};