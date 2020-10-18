import { combineReducers } from "redux";

const watchlistReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCHED_WATCHLIST":
      return action.items;
    case "POSTED_TO_WATCHLIST":
      return [...state, action.item];
    case "REMOVED_FROM_WATCHLIST":
      return [
        ...state.filter(item => {
          return item.ticker !== action.item.ticker;
        })
      ];
    case "LOGGED_OUT":
      return [];
    default:
      return state;
  }
};
const portfolioReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCHED_PORTFOLIO":
      return action.portfolio;
    case "ADJUSTED_CASH":
      return action.portfolio;
    case "POSTED_POSITION":
      return { ...state, positions: [...state.positions, action.position] };
    case "LOGGED_OUT":
      return {};
    default:
      return state;
  }
};

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case "LOADING_PORTFOLIO":
      return true;
    case "FETCHED_PORTFOLIO":
      return false;
    case "LOADING_USER":
      return true;
    case "FETCHED_USER":
      return false;

    default:
      return state;
  }
};

const positionReducer = (state = [], action) => {
  switch (action.type) {
    case "POSTED_POSITION":
      return action.position;
    case "FETCHED_POSITION":
      return action.position;
    case "CLOSED_POSITION":
      return null;
    case "LOGGED_OUT":
      return [];
    default:
      return state;
  }
};

const stockReducer = (state = null, action) => {
  switch (action.type) {
    case "FETCHED_STOCK":
      return action.stockInfo;
    case "SEARCHED_STOCK":
      return action.stockInfo;
    case "LOGGED_OUT":
      return null;
    default:
      return state;
  }
};

const searchReducer = (state = "", action) => {
  switch (action.type) {
    case "HANDLE_SEARCH_CHANGE":
      return action.text;
    default:
      return state;
  }
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCHED_USER":
      return action.user;
    case "LOGGED_IN_USER":
      return action.user;
    case "LOGGED_OUT":
      return {};
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  watchlist: watchlistReducer,
  portfolio: portfolioReducer,
  loading: loadingReducer,
  stock: stockReducer,
  position: positionReducer,
  search: searchReducer,
  user: userReducer
});

export default rootReducer;
