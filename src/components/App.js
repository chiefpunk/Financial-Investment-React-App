import React, { Component } from "react";
import Navbar from "./navbar";

import { Route, Switch, Redirect } from "react-router-dom";
import PortfolioPage from "../containers/portfolioPage";
import TradePage from "../containers/tradePage";
import ResearchPage from "../containers/researchPage";
import LoginPage from "../containers/loginPage";
import NotFound from "../components/notFound";
import LandingPage from "../containers/landingPage";
import "../App.css";
import { isEmpty } from "lodash";
import { fetchingUser } from "../redux/actions";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class App extends Component {
  componentDidMount = () => {
    let token = localStorage.getItem("token");
    this.props.fetchingUser("maksim_damaskin");
    // if (token) {
    //   fetch(`http://localhost:3000/api/v1/profile`, {
    //     headers: {
    //       Authentication: `Bearer ${token}`
    //     }
    //   })
    //     .then(res => res.json())
    //     .then(data => {
    //       console.log("Token exists, user is: ", data);
    //       this.props.fetchingUser(data.id);
    //     });
    // }
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Redirect to="/portfolios" />;
            }}
          />
          <Route
            exact
            path="/portfolios"
            render={() => {
              return isEmpty(this.props.user) ? (
                <Redirect to="/login" />
              ) : (
                <LandingPage />
              );
            }}
          />
          <Route
            exact
            path="/login"
            render={() => {
              return isEmpty(this.props.user) ? (
                <LoginPage />
              ) : (
                <Redirect to="/portfolios" />
              );
            }}
          />
          <Route
            path="/portfolios/:id"
            render={() => {
              return isEmpty(this.props.user) ? (
                <Redirect to="/login" />
              ) : (
                <PortfolioPage />
              );
            }}
          />
          <Route
            path="/trade/:id"
            render={() => {
              return isEmpty(this.props.user) ? (
                <Redirect to="/login" />
              ) : (
                <TradePage />
              );
            }}
          />
          <Route
            path="/trade"
            render={() => {
              return isEmpty(this.props.user) ? (
                <Redirect to="/login" />
              ) : (
                <TradePage />
              );
            }}
          />
          <Route
            path="/research"
            render={() => {
              return isEmpty(this.props.user) ? (
                <Redirect to="/login" />
              ) : (
                <ResearchPage />
              );
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchingUser: userId => {
      dispatch(fetchingUser(userId));
    }
  };
};

const mapStateToProps = state => {
  return {
    user: state.user,
    loading: state.loading
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
