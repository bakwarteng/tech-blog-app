const User = require("./user");
const Blog = require("./blog");
const Home = require("./home");

User.hasMany(Blog, {
  foreignKey: "blog_id",
});

// Painting.belongsTo(Gallery, {
//   foreignKey: "gallery_id",
// });

module.exports = { User, Blog, Home };
