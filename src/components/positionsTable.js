import React, { Component } from "react";
import Position from "./position";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Table, Container } from "semantic-ui-react";
import { postingPosition } from "../redux/actions";
import { adjustingCash } from "../redux/actions";
import { fetchingUser } from "../redux/actions";
import { sortBy, map } from "lodash";

class PositionsTable extends Component {
  constructor(props) {
    super();
    this.state = {
      column: null,
      data: null,
      direction: null
    };
  }

  handleSort = targetColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== targetColumn) {
      this.setState({
        column: targetColumn,
        data: sortBy(this.props.portfolio.positions, [targetColumn]),
        direction: "ascending"
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  render() {
    const { column, data, direction } = this.state;
    return !this.props.portfolio.positions ? (
      <div className="ui active text centered inline loader">
        Loading Positions
      </div>
    ) : (
      <Container>
        <h1 className="ui blue header align left">My Investments</h1>
        <Table selectable sortable celled striped singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "ticker" ? direction : null}
                onClick={this.handleSort("ticker")}
              >
                Ticker
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "quantity" ? direction : null}
                onClick={this.handleSort("quantity")}
              >
                Shares
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "info.quote.latestPrice" ? direction : null}
                onClick={this.handleSort("info.quote.latestPrice")}
              >
                Current Price
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "cost_basis" ? direction : null}
                onClick={this.handleSort("cost_basis")}
              >
                Cost Basis
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "value" ? direction : null}
                onClick={this.handleSort("value")}
              >
                Total Value
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "cost" ? direction : null}
                onClick={this.handleSort("cost")}
              >
                Total Cost
              </Table.HeaderCell>
              <Table.HeaderCell>$ G/L Day</Table.HeaderCell>
              <Table.HeaderCell
                sorted={
                  column === "info.quote.changePercent" ? direction : null
                }
                onClick={this.handleSort("info.quote.changePercent")}
              >
                % G/L Day
              </Table.HeaderCell>
              <Table.HeaderCell>$ G/L Total</Table.HeaderCell>
              <Table.HeaderCell>% G/L Total</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {!this.state.data ? (
            <Table.Body>
              {this.props.portfolio.positions.map(position => {
                return <Position key={position.id} position={position} />;
              })}
            </Table.Body>
          ) : (
            <Table.Body>
              {this.state.data.map(position => {
                return <Position key={position.id} position={position} />;
              })}
            </Table.Body>
          )}
        </Table>
      </Container>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    postingPosition: (ticker, quantity, price, portfolioId, userId) => {
      dispatch(postingPosition(ticker, quantity, price, portfolioId, userId));
    },
    adjustingCash: (newCash, portfolioId, userId) => {
      dispatch(adjustingCash(newCash, portfolioId, userId));
    },
    fetchingUser: userId => {
      dispatch(fetchingUser(userId));
    }
  };
};

const mapStateToProps = state => {
  return {
    loading: state.loading,
    portfolio: state.portfolio,
    user: state.user
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PositionsTable)
);
