import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
var PieChart = require("react-chartjs").Pie;

class PortfolioChart extends Component {
  render() {
    if (!!this.props.portfolio.positions) {
      let values = this.props.portfolio.positions.map(p => {
        return p.info.quote.latestPrice * p.quantity;
      });
      let invested = values.reduce((x, y) => {
        return x + y;
      });

      let data = [
        {
          value: invested,
          color: "#2185D0",
          highlight: "#99d6ff",
          label: "Invested"
        },
        {
          value: this.props.portfolio.cash,
          color: "#33cc33",
          highlight: "#adebad",
          label: "Cash"
        }
      ];

      const options = {
        legend: {
          display: true
        }
      };
      return !!this.props.portfolio ? (
        <PieChart data={data} options={options} />
      ) : (
        <div>Loading Data</div>
      );
    } else {
      return <div>Loading Data</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    portfolio: state.portfolio
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(PortfolioChart)
);

// if
