require("dotenv").config();
const { Platform } = require("../db");
const { getGamesApi } = require("./toVideogames");

const getPlatformsApi = async () => {
  let data = await getGamesApi();

  let repeatedPlats = [];

  data.forEach((game) => {
    game.platforms.forEach((plat) => {
      repeatedPlats.push(plat);
    });
  });

  //Se utiliza 'reduce' para crear una lista de plats sin duplicados y luego mapeamos para que cada elemento
  //sea un objeto con la propiedad name
  let platforms = repeatedPlats
    .reduce((acc, item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, [])
    .map((p) => {
      return {
        name: p,
      };
    });

  return platforms;
};

const getPlatforms = async () => {
  let databasePlats = await Platform.findAll();

  if (databasePlats.length === 0) {
    let create = await getPlatformsApi();

    await Platform.bulkCreate(create);
    databasePlats = await Platform.findAll();
  }

  return databasePlats;
};

module.exports = {
  getPlatformsApi,
  getPlatforms,
};
