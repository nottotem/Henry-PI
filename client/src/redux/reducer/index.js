import {
  GET_GAMES,
  GET_GAME_DETAILS,
  GET_GENRES,
  GET_PLATFORMS,
  CREATE_GAME,
  FILTER_BY_GENRES,
  FILTER_BY_CREATED,
  SORT_GAMES,
  RESET_FILTERS,
  RESET_CREATE,
  SET_PAGE,
  RESET_GAMES,
  RESET_GAME_DETAIL,
  FILTER_GAMES,
} from "../actions/index";

const initialState = {
  games: [],
  filteredGames: [],
  filtersApplied: {
    genres: "none",
    created: "none",
    sort: "none",
  },
  gameDetail: {},
  gameCreated: [],
  genres: [],
  platforms: [],
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
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
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
    case FILTER_BY_GENRES:
      return {
        ...state,
        filtersApplied: {
          ...state.filtersApplied,
          genres: action.payload,
        },
      };
    case FILTER_BY_CREATED:
      return {
        ...state,
        filtersApplied: {
          ...state.filtersApplied,
          created: action.payload,
        },
      };
    case SORT_GAMES:
      return {
        ...state,
        filtersApplied: {
          ...state.filtersApplied,
          sort: action.payload,
        },
      };
    case FILTER_GAMES:
      return {
        ...state,
        filteredGames: action.payload,
      };
    case RESET_FILTERS:
      return {
        ...state,
        filtersApplied: {
          genres: "none",
          created: "none",
          sort: "none",
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
          sort: "none",
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
        gameDetail: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
