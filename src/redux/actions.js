const URL = `http://localhost:3000/api/v1`;
//
function fetchingWatchlist(userId) {
  return (dispatch) => {
    fetch(`${URL}/users/${userId}/watchlist_items`)
      .then((res) => res.json())
      .then((items) => {
        // console.log(items);
        dispatch(fetchedWatchlist(items));
      });
  };
}

function postingToWatchlist(ticker, name, userId) {
  return (dispatch) => {
    fetch(`${URL}/users/${userId}/watchlist_items`, {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({
        ticker: ticker,
        name: name,
        user_id: userId,
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        console.log(item);
        dispatch(postedToWatchlist(item));
      });
  };
}

function removingFromWatchlist(ticker, userId) {
  return (dispatch) => {
    fetch(`${URL}/users/${userId}/watchlist_items/${ticker}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/JSON" },
    })
      .then((res) => res.json())
      .then((item) => {
        console.log(item);
        dispatch(removedFromWatchlist(item));
      });
  };
}

function loadingPortfolio() {
  return { type: "LOADING_PORTFOLIO" };
}

function fetchingPortfolio(portfolioId, userId) {
  return (dispatch) => {
    dispatch(loadingPortfolio());
    fetch(`${URL}/users/${userId}/portfolios/${portfolioId}`)
      .then((res) => res.json())
      .then((portfolio) => {
        dispatch(fetchedPortfolio(portfolio));
      });
  };
}

function postingPosition(ticker, quantity, price, portfolioId, userId) {
  return (dispatch) => {
    fetch(
      `http://localhost:3000/api/v1/users/${userId}/portfolios/${portfolioId}/positions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify({
          quantity: quantity,
          ticker: ticker,
          cost_basis: price,
          portfolio_id: portfolioId,
        }),
      }
    )
      .then((res) => res.json())
      .then((position) => {
        console.log(position);
        dispatch(postedPosition(position));
      });
  };
}

function fetchingPosition(ticker, portfolioId, userId) {
  return (dispatch) => {
    fetch(
      `http://localhost:3000/api/v1/users/${userId}/portfolios/${portfolioId}/positions/${ticker}`
    )
      .then((res) => res.json())
      .then((position) => {
        console.log(position);
        dispatch(fetchedPosition(position));
      });
  };
}

function adjustingPosition(ticker, newTotal, costBasis, portfolioId, userId) {
  return (dispatch) => {
    fetch(
      `http://localhost:3000/api/v1/users/${userId}/portfolios/${portfolioId}/positions/${ticker}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/JSON",
          Accept: "application/json",
        },
        body: JSON.stringify({
          position: {
            quantity: newTotal,
            ticker: ticker,
            cost_basis: costBasis,
            portfolio_id: portfolioId,
          },
        }),
      }
    )
      .then((res) => res.json())
      .then((position) => {
        dispatch(postedPosition(position));
      });
  };
}

function adjustingCash(newCash, portfolioId, userId) {
  return (dispatch) => {
    fetch(`${URL}/users/${userId}/portfolios/${portfolioId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/JSON",
        Accept: "application/json",
      },
      body: JSON.stringify({
        portfolio: {
          cash: newCash,
        },
      }),
    })
      .then((res) => res.json())
      .then((portfolio) => {
        dispatch(adjustedCash(portfolio));
      });
  };
}

function closingPosition(ticker, portfolioId, userId) {
  return (dispatch) => {
    fetch(
      `http://localhost:3000/api/v1/users/${userId}/portfolios/${portfolioId}/positions/${ticker}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/JSON",
          Accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((position) => {
        dispatch(closedPosition(position));
      });
  };
}

function fetchingStock(ticker) {
  return (dispatch) => {
    fetch(`${URL}/stocks/${ticker}`)
      .then((res) => res.json())
      .then((stockInfo) => {
        dispatch(fetchedStock(stockInfo));
      });
  };
}

function searching(searchTerm, portfolioId) {
  return (dispatch) => {
    fetch(`${URL}/stocks/${searchTerm}`)
      .then((res) => res.json())
      .then((stockInfo) => {
        dispatch(searchedStock(stockInfo));
        dispatch(fetchingPosition(searchTerm, portfolioId));
      });
  };
}

function loadingUser() {
  return { type: "LOADING_USER" };
}

function fetchingUser(userId) {
  
  return (dispatch) => {
    if (userId === "maksim_damaskin") dispatch(fetchedUser("maksim_damaskin"));
    dispatch(loadingUser());
    fetch(`${URL}/users/${userId}`, {
      method: "GET",
      headers: {
        Authentication: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((user) => {
        console.log(user);
        dispatch(fetchedUser(user));
      });
  };
}

function loggingInUser(username, password) {
  return (dispatch) => {
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          //we should be logged in
          localStorage.setItem("token", data.token);
          dispatch(fetchingUser(data.user.id));
          //store the token in localStorage
        } else {
          alert("Incorrect username or password");
        }
      })
      .catch((error) => console.log("Failed to Fetch:", error));
  };
}

function loggedInUser(user) {
  return { type: "LOGGED_IN_USER", user };
}

function fetchedStock(stockInfo) {
  return { type: "FETCHED_STOCK", stockInfo };
}

function searchedStock(stockInfo) {
  return { type: "SEARCHED_STOCK", stockInfo };
}

function postedPosition(position) {
  return { type: "POSTED_POSITION", position };
}
function closedPosition(position) {
  return { type: "CLOSED_POSITION", position };
}

function fetchedPosition(position) {
  return { type: "FETCHED_POSITION", position };
}

function fetchedPortfolio(portfolio) {
  return { type: "FETCHED_PORTFOLIO", portfolio };
}

function fetchedWatchlist(items) {
  return { type: "FETCHED_WATCHLIST", items };
}

function adjustedCash(portfolio) {
  return { type: "ADJUSTED_CASH", portfolio };
}

function handleSearchChange(text) {
  return { type: "HANDLE_SEARCH_CHANGE", text };
}

function postedToWatchlist(item) {
  return { type: "POSTED_TO_WATCHLIST", item };
}

function removedFromWatchlist(item) {
  return { type: "REMOVED_FROM_WATCHLIST", item };
}

function fetchedUser(user) {
  return { type: "FETCHED_USER", user };
}

function clearUserLoading() {
  return { type: "CLEAR_USER_LOADING" };
}

function loggedOut() {
  return { type: "LOGGED_OUT" };
}

export {
  fetchingWatchlist,
  fetchingPortfolio,
  postingPosition,
  fetchingStock,
  fetchingPosition,
  adjustingPosition,
  closingPosition,
  adjustingCash,
  handleSearchChange,
  searching,
  postingToWatchlist,
  removingFromWatchlist,
  fetchingUser,
  loggingInUser,
  loggedInUser,
  fetchedUser,
  clearUserLoading,
  loggedOut,
};
