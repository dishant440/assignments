const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  username = req.body.username;
  password = req.body.password;

  Admin.findOne({ username, password }).then((value) => {
    if (value) {
      res.status(404).json({ message: "Admin exist" });
    }
  });

  await Admin.create({ username, password });
  res.status(200).json({
    message: "Admin created successfully",
  });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;

  try {
    const newCourse = await Course.create({ title, description, price });
    res.status(200).json({
      message: "Course created successfully",
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});

router.get("/courses", adminMiddleware, async(req, res) => {
  // Implement fetching all courses logic
    const response = await Course.find({});
    res.json({
        courses:response
    })


});

module.exports = router;
