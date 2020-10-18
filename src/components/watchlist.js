import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import WatchlistItem from "./watchlistItem";
import { uniqBy } from "lodash";
import { Card, Header } from "semantic-ui-react";
class Watchlist extends Component {
  render() {
    return (
      <Fragment>
        <h1 id="watchlist" className="ui blue header">
          My Watchlist
        </h1>
        <Card.Group centered stackable>
          {uniqBy(this.props.watchlist, "ticker").map(stock => {
            return <WatchlistItem key={stock.ticker} stock={stock} />;
          })}
        </Card.Group>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    watchlist: state.watchlist
  };
};

export default withRouter(connect(mapStateToProps)(Watchlist));
