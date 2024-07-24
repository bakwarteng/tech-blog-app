const router = require("express").Router();
const server = require("../../server"); 
const userRoutes = require("./user-routes");
const blogRoutes = require("./blog-routes");

router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);

module.exports = router;
