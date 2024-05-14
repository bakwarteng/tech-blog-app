const sequelize = require("../config/connection");
const seedBlog = require("./blogData");
const seedUser = require("./userData");

const seedAll = async function () {
  await sequelize.sync({ force: true });

  await seedBlog();

  await seeduser();

  process.exit(0);
};

seedAll();
