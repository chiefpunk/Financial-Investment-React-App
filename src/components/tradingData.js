import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
var numeral = require("numeral");

class TradingData extends Component {
  render() {
    return !this.props.stock ? (
      <div>Loading</div>
    ) : (
      <table className="ui compact celled table">
        <thead>
          <tr>
            <th className="two wide" colSpan="2">{`${
              this.props.stock.quote.companyName
            } Info`}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Latest Price</td>
            <td>
              {numeral(this.props.stock.quote.latestPrice).format("$0,0.00")}
            </td>
          </tr>
          <tr>
            <td>Change ($)</td>
            <td>
              {numeral(this.props.stock.quote.change).format("($0,0.00)")}
            </td>
          </tr>
          <tr>
            <td>Change (%)</td>
            <td>
              {numeral(this.props.stock.quote.changePercent).format("(0.00%)")}
            </td>
          </tr>
          <tr>
            <td>Day Range</td>
            <td>
              {`${numeral(this.props.stock.quote.low).format(
                "$0,0.00"
              )} - ${numeral(this.props.stock.quote.high).format("$0,0.00")}`}
            </td>
          </tr>
          <tr>
            <td>Market Cap </td>
            <td>
              {`${numeral(this.props.stock.quote.marketCap / 1000000000).format(
                "$0,0.00"
              )}`}
              B
            </td>
          </tr>
          <tr>
            <td>P/E Ratio</td>
            <td>{this.props.stock.quote.peRatio}</td>
          </tr>
          <tr>
            <td>52 Week Range</td>
            <td>
              {numeral(this.props.stock.quote.week52Low).format("$0,0.00")}-
              {numeral(this.props.stock.quote.week52High).format("$0,0.00")}
            </td>
          </tr>
          <tr>
            <td>Day Low</td>
            <td>{numeral(this.props.stock.quote.low).format("$0,0.00")}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stock
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(TradingData)
);
