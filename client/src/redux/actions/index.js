import axios from "axios";
const { REACT_APP_URL_PATH_API } = process.env;

export const GET_GAMES = "GET_GAMES";
export const GET_GAME_DETAILS = "GET_GAME_DETAILS";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const CREATE_GAME = "CREATE_GAME";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const SORT_GAMES = "SORT_GAMES";
export const RESET_FILTERS = "RESET_FILTERS";
export const RESET_CREATE = "RESET_CREATE";
export const SET_PAGE = "SET_PAGE";
export const RESET_GAMES = "RESET_GAMES";
export const RESET_GAME_DETAIL = "RESET_GAME_DETAIL";
export const RESET_PLATFORMS = "RESET_PLATFORMS";
export const FILTER_GAMES = "FILTER_GAMES";

export const getGames = (game) => {
  //(el dispatch viene por thunkMiddelware)
  return function (dispatch) {
    let url = `${REACT_APP_URL_PATH_API}/videogames`;

    if (game) {
      url += `?game=${game}`;
    }

    return axios.get(url).then(
      (response) => {
        dispatch({ type: GET_GAMES, payload: response.data });
      },
      (error) => {
        dispatch({ type: GET_GAMES, payload: error.response.data });
      }
    );
  };
};

export function filterByGenres(payload) {
  return { type: FILTER_BY_GENRES, payload };
}

export function filterByCreated(payload) {
  return { type: FILTER_BY_CREATED, payload };
}

export function sortGames(payload) {
  return { type: SORT_GAMES, payload };
}

export function resetFilters() {
  return { type: RESET_FILTERS };
}

export const getGameDetails = (id) => {
  return function (dispatch) {
    return axios.get(`${REACT_APP_URL_PATH_API}/videogame/${id}`).then(
      (response) => {
        dispatch({ type: GET_GAME_DETAILS, payload: response.data });
      },
      (error) => {
        dispatch({ type: GET_GAME_DETAILS, payload: error.response.data });
      }
    );
  };
};

export const getGenres = () => {
  return function (dispatch) {
    return axios.get(`${REACT_APP_URL_PATH_API}/genres`).then((response) => {
      dispatch({ type: GET_GENRES, payload: response.data });
    });
  };
};

export const getPlatforms = () => {
  return function (dispatch) {
    return axios.get(`${REACT_APP_URL_PATH_API}/platforms`).then((response) => {
      dispatch({ type: GET_PLATFORMS, payload: response.data });
    });
  };
};

//El par??metro "info" es la informaci??n (que va por body) del videojuego que vamos a crear
export const createGame = (info) => {
  return function (dispatch) {
    return axios.post(`${REACT_APP_URL_PATH_API}/videogames`, info).then(
      (response) => {
        dispatch({ type: CREATE_GAME, payload: response.data });
      },
      (error) => {
        dispatch({ type: CREATE_GAME, payload: error.response.data });
      }
    );
  };
};

export function resetCreate() {
  return { type: RESET_CREATE, payload: [] };
}

export function setPage(page) {
  return { type: SET_PAGE, payload: page };
}

export function resetGames() {
  return { type: RESET_GAMES, payload: [] };
}

export function resetGameDetail() {
  return { type: RESET_GAME_DETAIL, payload: {} };
}

export function resetPlatforms() {
  return { type: RESET_PLATFORMS, payload: [] };
}
