const router = require("express").Router();
const apiRoutes = require("./api");
const server = require("../server"); 
const loginForm = require("./api/login-routes");
const lougout = require("./api/user-routes")
const homepage = require("./home-routes");
const blogPage = require("./api/blog-routes");
router.use("/", homepage);
router.use("/api", apiRoutes);
router.use("/login", loginForm);
router.use("/blogs", blogPage);
router.use("/logout", homepage)

module.exports = router;
