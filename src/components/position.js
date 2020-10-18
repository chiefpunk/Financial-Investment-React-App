import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
var numeral = require("numeral");

class Position extends Component {
  render() {
    let shares = this.props.position.quantity;
    let ticker = this.props.position.ticker;
    let currentPrice = this.props.position.info.quote.latestPrice;
    let cost_basis = this.props.position.cost_basis;
    let totalValue = shares * currentPrice;
    let totalCost = shares * cost_basis;
    let totalGain = totalValue - totalCost;
    let totalGainPercent = totalGain / totalCost;
    let dayGain = this.props.position.info.quote.change;
    let dayGainPercent = 100 * this.props.position.info.quote.changePercent;

    return (
      <tr>
        <td>
          <Link to={`/trade/${ticker}`}>{ticker}</Link>
        </td>
        <td>{numeral(shares).format("0,0")}</td>
        <td>{numeral(currentPrice).format("$0,0.00")}</td>
        <td>{numeral(cost_basis).format("$0,0.00")}</td>
        <td>{numeral(totalValue).format("$0,0.00")}</td>
        <td>{numeral(totalCost).format("$0,0.00")}</td>
        <td className={dayGain * shares < 0 ? "negative" : "positive"}>
          {numeral(dayGain * shares).format("($0,0.00)")}
        </td>
        <td className={dayGainPercent < 0 ? "negative" : "positive"}>
          {numeral(dayGainPercent / 100).format("(0.00 %)")}
        </td>
        <td className={totalGain < 0 ? "negative" : "positive"}>
          {numeral(totalGain).format("($0,0.00)")}
        </td>
        <td className={totalGainPercent < 0 ? "negative" : "positive"}>
          {numeral(totalGainPercent).format("(0.00 %)")}
        </td>
      </tr>
    );
  }
}

export default withRouter(Position);
