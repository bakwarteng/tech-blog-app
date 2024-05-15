const router = require("express").Router();
const { Blog, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/blogs", withAuth, async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["username", " user_id"],
        },
      ],
    });
    const blogData = blogs.map((blogs) => blogs.get({ plain: true }));
    res.status(200);
    res.json(blogs);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.get("/blogs/:id", async (req, res) => {
  try {
    const blogs = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username", " user_id"],
        },
      ],
    });

    const blogData = Blog.get({ plain: true });
    res.render("blogs", { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/blogs", async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
      blog_title: req.session,
      blog_content: req.session,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
});

router.delete("/blog/:id", async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: "No blogs found with this id!" });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
