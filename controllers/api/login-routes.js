const { Model, DataTypes } = require("sequelize");
const router = require("express").Router();
const { Blog, User } = require("../../models");

// Login route
router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      res.status(400).send("Username and password are required");
      return;
    }

    // Check if the user exists
    const user = await User.findOne({ where: { username } });
    if (!user || !user.checkPassword(password)) {
      res.status(401).send("Invalid username or password");
      return;
    }

    // Set loggedIn session property
    req.session.loggedIn = true;
    req.session.userId = user.id; // Store user ID in session for future use

    // Redirect to home page or any other page after successful login
    res.redirect("/");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
