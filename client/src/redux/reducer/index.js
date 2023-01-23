import {
  GET_GAMES,
  GET_GAME_DETAILS,
  GET_GENRES,
  CREATE_GAME,
  // FILTER_BY_GENRES,
  // FILTER_BY_CREATED,
  // SORT_GAMES,
  RESET_FILTERS,
  RESET_CREATE,
  SET_PAGE,
  RESET_GAMES,
  RESET_GAME_DETAIL,
} from "../actions/index";

const initialState = {
  games: [],
  filteredGames: [],
  filtersApplied: {
    genres: "none",
    created: "none",
    sort: "nameAsc",
  },
  gameDetail: {},
  gameCreated: [],
  genres: [],
  currentPage: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        games: action.payload,
        filteredGames: action.payload,
      };
    case GET_GAME_DETAILS:
      return {
        ...state,
        gameDetail: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case CREATE_GAME:
      return {
        ...state,
        gameCreated: action.payload,
      };
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case RESET_FILTERS:
      return {
        ...state,
        filtersApplied: {
          genres: "none",
          created: "none",
          sort: "nameAsc",
        },
      };

    case RESET_GAMES:
      return {
        ...state,
        games: action.payload,
        filteredGames: action.payload,
        currentPage: 1,
        filtersApplied: {
          genres: "none",
          created: "none",
          sort: "nameAsc",
        },
      };
    case RESET_CREATE:
      return {
        ...state,
        gameCreated: action.payload,
      };

    case RESET_GAME_DETAIL:
      return {
        ...state,
        gameDetails: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
