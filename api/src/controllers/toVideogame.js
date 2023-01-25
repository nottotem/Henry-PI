const { Videogame, Genre } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const apiGameID = async (idGame) => {
  let idByApi = await axios.get(
    `https://api.rawg.io/api/games/${idGame}?key=${API_KEY}`
  );
  idByApi = idByApi.data;

  let getID = {
    name: idByApi.name,
    genres: idByApi.genres.map((g) => g.name),
    // Genres: idByApi.genres.map((genre) => {
    //   return {
    //     name: genre.name,
    //   };
    // }),
    description: idByApi.description_raw,
    background_image: idByApi.background_image,
    release_date: idByApi.released,
    rating: idByApi.rating,
    platforms: idByApi.platforms.map((p) => {
      return p.platform.name;
    }),
  };

  return getID;
};

const dbGameID = async (idGame) => {
  let getID = await Videogame.findByPk(idGame, {
    include: [
      {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  return getID;
};

const gameID = async (idGame) => {
  let game;
  if (!idGame.includes("-")) {
    game = await apiGameID(idGame);
  } else {
    game = await dbGameID(idGame);
  }

  if (!Object.keys(game).length) {
    game = { error: `No se encontró ningún juego con el ID: ${idGame}` };
  }

  return game;
};

module.exports = {
  apiGameID,
  dbGameID,
  gameID,
};
