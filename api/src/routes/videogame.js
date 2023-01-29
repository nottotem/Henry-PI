const { Router } = require("express");
const router = Router();
const { gameID } = require("../controllers/toVideogame");

//Obtener un juego por su ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let getGameID = await gameID(id);
    getGameID.error
      ? res.status(400).json(getGameID)
      : res.status(200).json(getGameID);
  } catch (error) {
    res.status(400).json({ error: `No game found with ID: ${id}` });
  }
});

module.exports = router;
