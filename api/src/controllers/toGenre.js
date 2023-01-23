const { Genre } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getGenreApi = async () => {
  let url = `https://api.rawg.io/api/genres?key=${API_KEY}`;
  let genresApi = await axios.get(url);

  let genres = genresApi.data.results.map((genre) => {
    return {
      name: genre.name,
    };
  });

  return genres;
};

const getGenre = async () => {
  let genresDB = await Genre.findAll();

  if (genresDB.length === 0) {
    let createGenres = await getGenreApi();
    //Con "bulkCreate" insertamos todos los géneros en la BDD
    await Genre.bulkCreate(createGenres);
    genresDB = await Genre.findAll();
  }

  return genresDB;
};

module.exports = {
  getGenreApi,
  getGenre,
};
