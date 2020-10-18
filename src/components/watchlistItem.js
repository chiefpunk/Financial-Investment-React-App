import React, { Component } from "react";
import { Card } from "semantic-ui-react";

import { NavLink } from "react-router-dom";
import { fetchingPosition } from "../redux/actions";
import { fetchingStock } from "../redux/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class WatchlistItem extends Component {
  fetchInfo = ticker => {
    this.props.fetchingPosition(
      ticker,
      this.props.portfolio.id,
      this.props.user.id
    );
    this.props.fetchingStock(ticker);
  };

  render() {
    return (
      <Card
        as={NavLink}
        to={`/trade/${this.props.stock.ticker}`}
        onClick={() => {
          this.fetchInfo(this.props.stock.ticker);
        }}
        color="blue"
      >
        <Card.Content>
          <Card.Header as="h3" textAlign="center" color="blue">
            {this.props.stock.name}
          </Card.Header>
        </Card.Content>
      </Card>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchingPosition: (ticker, portfolioId, userId) => {
      dispatch(fetchingPosition(ticker, portfolioId, userId));
    },
    fetchingStock: ticker => {
      dispatch(fetchingStock(ticker));
    }
  };
};

const mapStateToProps = state => {
  return {
    portfolio: state.portfolio,
    watchlist: state.watchlist,
    user: state.user
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WatchlistItem)
);
