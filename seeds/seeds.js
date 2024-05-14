const sequelize = require("../config/connection");
const { User } = require("../models");

const blogData = require("./blogData.json");
const seedUser = require("./userData");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(seedUser, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};
seedDatabase();
