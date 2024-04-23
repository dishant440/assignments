const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.headers.username;
  const password = req.headers.password;

  const UserExist = await User.findOne({ username });
  if (!UserExist) {
    await User.create({ username, password });
    res.json({
      message: "User Created Successfully",
    });
  }
  res.json({
    message: "User already exists",
  });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const username = req.headers.username;

  const response = await Course.findOne({});
  res.json({
    message: response,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;

  await Course.updateOne(
    {
      username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );
  res.json({
    message: "Course purchased successfully",
  });
});

router.get("/purchasedCourses", userMiddleware,async (req, res) => {
  // Implement fetching purchased courses logic
  const user = await User.findOne({
    username: req.headers.username
});

console.log(user.purchasedCourses);
const courses = await Course.find({
    _id: {
        "$in": user.purchasedCourses
    }
});

res.json({
    courses: courses
})
});

module.exports = router;
