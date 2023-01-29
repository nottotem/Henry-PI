const { Router } = require("express");
const router = Router();
const { getPlatforms } = require("../controllers/toPlatform");

router.get("/", async (req, res) => {
  try {
    let platforms = await getPlatforms();
    res.status(200).json(platforms);
  } catch (error) {
    res
      .status(400)
      .json({ error: "There was a mistake trying to get the platforms" });
  }
});

module.exports = router;
