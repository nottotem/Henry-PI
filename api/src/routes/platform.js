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
      .json({ error: "Hubo un error al intentar conseguir las plataformas" });
  }
});

// router.get("/", async (req, res) => {
//   let platforms = await getPlatforms();

//   let statusCode;
//   platforms.msgError ? (statusCode = 400) : (statusCode = 200);

//   res.status(statusCode).json(platforms);
// });

module.exports = router;
