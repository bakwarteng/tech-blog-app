const Sequelize = require("sequelize");
require("dotenv").config();

const password= String(process.env.DB_PASSWORD)

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, {
      dialect: "postgres",
      protocol: "postgres",
      logging: false, // Disable logging; default: console.log
      dialectOptions: {
        ssl: process.env.DB_SSL === "true", // Enable SSL if required
      },
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        logging: false, // Disable logging; default: console.log
        dialectOptions: {
          ssl: process.env.DB_SSL === "true", // Enable SSL if required
        },
      }
    );

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
