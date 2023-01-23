const { Router } = require("express");
const router = Router();
const { getAllGames, createGame } = require("../controllers/toVideogames");

//Obtener listado completo de juegos o devolver los primeros 15 si me pasan "game" por query
router.get("/", async (req, res) => {
  const { game } = req.query;

  try {
    let allGames = await getAllGames(game);
    allGames.error
      ? res.status(400).json(allGames.error)
      : res.status(200).json(allGames);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Crea un juego en la BDD
router.post("/", async (req, res) => {
  try {
    const newGame = await createGame(req.body);
    newGame.error
      ? res.status(400).json(newGame.error)
      : res.status(200).json(newGame);
  } catch (error) {
    res.status(400).json({ error: "Hubo un error al intentar crear el juego" });
  }
});

module.exports = router;
