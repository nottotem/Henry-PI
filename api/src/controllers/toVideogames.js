const { Videogame, Genre, Op } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getGamesApi = async (game) => {
  let resultsApi = [];

  if (!game) {
    // let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
    // let page = 1;
    // while (page <= 5) {
    //   apiGames = await axios.get(url);
    //   resultsApi = resultsApi.concat(apiGames.data.results);
    //   url = apiGames.data.next;
    //   page++;
    // }

    let pags = [1, 2, 3, 4, 5];
    let infoApiPromises = [];

    for (const pag of pags) {
      let promises = axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${pag}`
      );

      infoApiPromises.push(promises.then((response) => response.data.results));
    }

    resultsApi = await Promise.all(infoApiPromises);
    resultsApi = resultsApi.flat();
  } else {
    let urlQuery = `https://api.rawg.io/api/games?search=${game}&key=${API_KEY}`;
    const apiGamesQuery = await axios.get(urlQuery);
    resultsApi = apiGamesQuery.data.results.slice(0, 15);
  }

  //-----------------------------------------------------------------------------\\
  //El juego con "ID: 58134" es muy pesado haciendo que la página tarde en cargar
  resultsApi = resultsApi.filter((game) => game.id !== 58134);
  //-----------------------------------------------------------------------------\\

  let infoGames = resultsApi.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      rating: game.rating,
      platforms: game.platforms.map((p) => p.platform.name),
      // platforms: game.platforms,
      created: false,
      genres: game.genres.map((g) => g.name),
    };
  });

  return infoGames;
};

const getGamesDB = async (game) => {
  let resultsDB = [];

  const requestDB = {
    //Especificamos los atributos que queremos obtener en la consulta
    attributes: ["id", "name", "rating", "background_image", "create"],
    //Condición de búsqueda vacía
    where: {},
    //Incluimos el modelo "Genre" mostrando solo su propiedad "name" y no traemos nada de la lista intermedia
    include: {
      model: Genre,
      attributes: ["name"],
      through: { attributes: [] },
    },
  };

  if (game) {
    requestDB.where = { name: { [Op.iLike]: `%${game}%` } };
  }

  //Busco todos los juegos que haya en la BDD
  resultsDB = await Videogame.findAll(requestDB);

  resultsDB = resultsDB.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      rating: game.rating,
      genres: game.Genres.map((g) => g.name),
      created: true,
    };
  });

  return resultsDB;
};

const getAllGames = async (game) => {
  //Array con los juegos de la API
  const gamesAPI = await getGamesApi(game);
  //Array con los juegos de la DB
  const gamesDB = await getGamesDB(game);
  //Concateno el array con juegos de la DB y el array de juegos de la API
  let allGames = gamesDB.concat(gamesAPI);

  if (game && !allGames.length) {
    return { error: "There is no game with that name" };
  }

  return allGames;
};

const createGame = async ({
  name,
  description,
  release_date,
  rating,
  background_image,
  platforms,
  genres,
}) => {
  if (!name || !description || !platforms.length)
    return {
      error: 'The fields "name", "description" and "platforms" are required',
    };

  if (genres.length === 0)
    return { error: "The game needs at least one genre" };

  if (!background_image)
    background_image =
      "https://www.giulianisgrupo.com/wp-content/uploads/2018/05/nodisponible.png";

  const [game, created] = await Videogame.findOrCreate({
    where: { name },
    defaults: {
      description,
      release_date,
      rating,
      background_image,
      platforms,
    },
  });

  if (!created) {
    return { error: "There is already a videogame with that name" };
  }

  game.addGenres(genres);
  return { message: "The game was successfully created!" };
};

module.exports = {
  getGamesApi,
  getGamesDB,
  getAllGames,
  createGame,
};
