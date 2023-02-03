/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createGame,
  getGenres,
  getPlatforms,
  resetCreate,
  resetGames,
} from "../../redux/actions";
import "./Form.css";

const Form = () => {
  const { genres, platforms, gameCreated } = useSelector((state) => state);

  const dispatch = useDispatch();

  //Estado local del juego a crear en el formulario
  const [game, setGame] = useState({
    name: "",
    description: "",
    release_date: "",
    rating: 5,
    platforms: [],
    genres: [],
    background_image: "",
  });

  //Estdo local para el botón de creación del form
  const [errorButton, setErrorButton] = useState(true);

  //Estado local para el objeto de errores en la validación
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(resetCreate());
    dispatch(resetGames());
    if (!genres.length) {
      dispatch(getGenres());
    }
  }, []);

  useEffect(() => {
    dispatch(getPlatforms());
  }, []);

  //------------------------------VALIDACIÓN------------------------------\\

  // Letras minúsculas y mayúsculas, números, guión, paréntesis, espacio y punto, entre 4 y 25.
  const regexName = /^[a-zA-ZÀ-ÿ\u00f1\u00d10-9-() .]{4,25}$/;
  // Un solo dígito entre 0 y 5, posibilidad de agregar 1 o 2 decimales.
  const regexDecimal = /^\d{1}(\.\d{1,2})?$/;
  // Expresión para que la URL sea válida
  const regexUrl =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#()?&//=]*)/;

  const validate = (value) => {
    let errors = {};

    if (!value.name) {
      errors.name = "Game name is required";
    } else if (value.name.length < 4 || value.name.length > 25) {
      errors.name = "Name must contain between 4 and 25 characters";
    } else if (value.name && !regexName.test(value.name)) {
      errors.name =
        "Only letters, numbers, middle hyphen, parentheses, spaces, and periods are supported.";
    }

    if (!value.description) {
      errors.description = "Game description is required";
    } else if (value.description > 2000) {
      errors.description = "Description can contain maximum 2000 characters";
    }

    if (value.rating < 0 || value.rating > 5) {
      errors.rating = "Rating must be between 0 and 5";
    } else if (!regexDecimal.test(value.rating)) {
      errors.rating = "Rating can have a maximum of 2 decimal places";
    }

    if (!value.platforms.length) {
      errors.platforms = "It's required to add at least one platform";
    }

    if (!value.genres.length) {
      errors.genres = "It's required to add at least one genre";
    }

    if (value.background_image && !regexUrl.test(value.background_image)) {
      errors.background_image = "Image must be a valid URL";
    }

    setErrors(errors);
  };

  useEffect(() => {
    //Frena que me salten todos los errores cuando abra el formulario
    if (!genres.length || !platforms.length) return;
    validate(game);
  }, [game]);

  useEffect(() => {
    //Frena la primera ejecución de los errores
    if (!genres.length || !platforms.length) return;
    if (!Object.keys(errors).length) {
      setErrorButton(false);
    } else {
      setErrorButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  //------------------------------HANDLERS------------------------------\\

  //Handler para tomar los datos que escribimos en el input y pasarlos al estado local game
  const handleChange = (event) => {
    setGame({
      ...game,
      [event.target.name]: event.target.value,
    });
  };

  //Handler para enviar el formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createGame(game));
  };

  //generamos un set para que elimine valores repetidos y a partir del set generamos un arreglo
  const handleGenres = (event) => {
    if (game.genres.length < 6) {
      setGame({
        ...game,

        genres: [...new Set([...game.genres, event.target.value])],
      });
    }
  };

  const deleteGenres = (name) => {
    let newGenre = game.genres.filter((genre) => genre !== name);
    setGame({
      ...game,
      genres: newGenre,
    });
  };

  //generamos un set para que elimine valores repetidos y a partir del set generamos un arreglo
  const handlePlatforms = (event) => {
    if (game.platforms.length < 6) {
      setGame({
        ...game,
        platforms: [...new Set([...game.platforms, event.target.value])],
      });
    }
  };

  const deletePlatforms = (name) => {
    let newPlats = game.platforms.filter((platform) => platform !== name);
    setGame({
      ...game,
      platforms: newPlats,
    });
  };

  useEffect(() => {
    if (gameCreated.error) {
      alert(gameCreated.error);
      dispatch(resetCreate());
    }

    if (gameCreated.message) {
      alert(gameCreated.message);
      dispatch(resetCreate());
      setGame({
        name: "",
        description: "",
        release_date: "",
        rating: 5,
        background_image: "",
        genres: [],
        platforms: [],
      });
    }
  }, [gameCreated]);

  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <div className="createContainer">
        <div className="leftContainer">
          <div className="divs">
            <label className="labelContainer">Name </label>
            <input
              className={errors.name ? "inputErrorContainer" : "inputContainer"}
              name="name"
              value={game.name}
              onChange={handleChange}
            ></input>
            {errors.name ? <p className="errorText">{errors.name}</p> : ""}
          </div>
          <div className="divDescription">
            <label>Description </label>
            <textarea
              className={
                errors.description ? "inputErrorContainer" : "inputContainer"
              }
              // rows="12"
              name="description"
              value={game.description}
              onChange={handleChange}
            ></textarea>
            {errors.description ? (
              <p className="errorText">{errors.description}</p>
            ) : (
              ""
            )}
          </div>
          <div className="divs">
            <label className="labelContainer">Release Date </label>
            <input
              className="inputContainer"
              name="release_date"
              type="date"
              value={game.release_date}
              onChange={handleChange}
            ></input>
          </div>
          <div className="divs">
            <label className="labelContainer">Rating </label>
            <input
              className={
                errors.rating ? "inputErrorContainer" : "inputContainer"
              }
              name="rating"
              type="number"
              min="1"
              max="5"
              value={game.rating}
              onChange={handleChange}
            ></input>
            {errors.rating ? <p className="errorText">{errors.rating}</p> : ""}
          </div>
        </div>
        <div className="rightContainer">
          <div className="divsSelect">
            <label className="labelContainer">Platforms </label>
            <select name="platforms" value="0" onChange={handlePlatforms}>
              <option selected disabled value="0">
                Add Platform
              </option>
              {platforms?.map((platform) => (
                <option key={platform.id} value={platform.name}>
                  {platform.name}
                </option>
              ))}
            </select>
          </div>
          <div className="divPruebaa">
            <span>Platforms Selected (max - 6 - platforms)</span>
            {game.platforms.map((platform) => (
              <div className="divClose">
                <p>
                  {platform} <i onClick={() => deletePlatforms(platform)}>X</i>
                </p>
              </div>
            ))}
            {errors.platforms ? (
              <p className="errorText">{errors.platforms}</p>
            ) : (
              ""
            )}
          </div>
          <div className="divsSelect">
            <label className="labelContainer">Genres </label>
            <select name="genres" value="0" onChange={handleGenres}>
              <option selected disabled value="0">
                Add Genre
              </option>
              {genres?.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <div className="divPruebaa">
            <span>Genres Selected (max - 6 - genres)</span>
            {game.genres.map((genre) => (
              <div className="divClose">
                <p>
                  {genre} <i onClick={() => deleteGenres(genre)}>X</i>
                </p>
              </div>
            ))}
            {errors.genres ? <p className="errorText">{errors.genres}</p> : ""}
          </div>
          <div className="divs">
            <label className="labelContainer">Image </label>
            <input
              placeholder="Insert a valid URL"
              className={
                errors.background_image
                  ? "inputErrorContainer"
                  : "inputContainer"
              }
              name="background_image"
              value={game.background_image}
              onChange={handleChange}
            ></input>
            {errors.background_image ? (
              <p className="errorText">{errors.background_image}</p>
            ) : (
              ""
            )}
          </div>
          {/* <div className=""> */}

          {/* </div> */}
        </div>
        <button
          className={errorButton ? "errorButton" : "createButton"}
          type="submit"
          disabled={errorButton}
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default Form;
