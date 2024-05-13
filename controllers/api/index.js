const router = require("express").Router();
const apiRoutes = require('../api')
const homepage = require("./home-routes");
const userRoutes = require("./user-routes");
const blogRoutes = require("./blog-routes");
const loginPage = require("./login-routes");
router.use("/", homepage);
router.use("/login", loginPage);
router.use("/user", userRoutes);
router.use("/blog", blogRoutes);

module.exports = router;
