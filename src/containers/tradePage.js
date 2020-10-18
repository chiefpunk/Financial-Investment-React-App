import React, { Component } from "react";
import Watchlist from "../components/watchlist";
// import SecurityChart from "../components/securityChart";
import StockNewsContainer from "../components/stockNewsContainer";
import TradingData from "../components/tradingData";
import TradeControls from "../components/tradeControls";
import MyTradeInfo from "../components/myTradeInfo";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Card, Grid, Divider, Input } from "semantic-ui-react";
import TradingViewWidget from "react-tradingview-widget";
import { fetchingWatchlist } from "../redux/actions";
import WatchlistItem from "../components/watchlistItem";
import { uniqBy } from "lodash";

class TradePage extends Component {
  constructor() {
    super();
    this.state = {
      filter: ""
    };
  }

  handleFilterChange = e => {
    this.setState({
      filter: e.target.value.toUpperCase()
    });
  };

  componentDidMount() {
    this.props.fetchingWatchlist(this.props.user.id);
  }
  render() {
    // let ticker = this.props.match.params.id;
    return !this.props.match.params.id ? (
      <div>
        <h1>Select a Stock to Trade</h1>
        <Input
          label="FILTER"
          value={this.state.filter}
          onChange={this.handleFilterChange}
        />
        <h2>My Stocks</h2>
        <div>
          {!this.props.portfolio.positions ? (
            <div>Select a portfolio to view your stocks</div>
          ) : (
            <Card.Group itemsPerRow={3} vertical>
              {this.props.portfolio.positions
                .filter(p =>
                  p.info.quote.companyName
                    .toUpperCase()
                    .includes(this.state.filter)
                )
                .map(p => {
                  return (
                    <Card color="blue" as={NavLink} to={`/trade/${p.ticker}`}>
                      <Card.Content>
                        <Card.Header as="h3" textAlign="center" color="blue">
                          {p.info.quote.companyName}
                        </Card.Header>
                      </Card.Content>
                    </Card>
                  );
                })}
            </Card.Group>
          )}
        </div>
        <h2>My Watchlist</h2>
        <Card.Group itemsPerRow={3} vertical>
          {uniqBy(this.props.watchlist, "ticker")
            .filter(wi => wi.name.toUpperCase().includes(this.state.filter))
            .map(stock => {
              return <WatchlistItem key={stock.ticker} stock={stock} />;
            })}
        </Card.Group>
      </div>
    ) : (
      <Grid centered columns={2}>
        <Grid.Column>
          <Grid.Row className="chart">
            <h1 className="ui blue header align center">
              {!this.props.stock ? "" : this.props.stock.quote.companyName}
            </h1>
            <TradingViewWidget
              symbol={`${this.props.match.params.id}`}
              autosize
            />
          </Grid.Row>
        </Grid.Column>
        <Grid.Row centered columns={4} className="chart2">
          <Grid.Column>
            <MyTradeInfo />
            <TradeControls />
            <TradingData />
          </Grid.Column>
          <Grid.Column>
            <Watchlist />
            <Divider horizontal />
            <StockNewsContainer />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    portfolio: state.portfolio,
    watchlist: state.watchlist,
    stock: state.stock,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchingWatchlist: userId => {
      dispatch(fetchingWatchlist(userId));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TradePage)
);
