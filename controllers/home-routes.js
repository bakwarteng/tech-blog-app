const router = require("express").Router();
const { User, Blog } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({});

    // Serialize data so the template can read it
    const blogs = blogData.map((blogs) => blogs.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/blogProfile", withAuth, async (req, res) => {
  const userData = await User.findOne({ where: { id: 1 } });
  const blogData = await Blog.findAll({});

  // Serialize data so the template can read it
  const blogs = blogData.map((blogs) => blogs.get({ plain: true }));
  const user = userData.get({ plain: true });
  res.render("blogProfile", {
    user,
    blogs,
    logged_in: req.session.logged_in,
  });
});
module.exports = router;
