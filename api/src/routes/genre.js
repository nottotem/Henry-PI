const { Router } = require("express");
const router = Router();
const { getGenre } = require("../controllers/toGenre");

router.get("/", async (req, res) => {
  try {
    let genres = await getGenre();
    res.status(200).json(genres);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
