import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Table } from "semantic-ui-react";

var numeral = require("numeral");
class MyTradeInfo extends Component {
  render() {
    return !this.props.portfolio ? (
      <div>loading</div>
    ) : (
      <Table basic="very">
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <h3 className="ui blue header">Current Position</h3>
            </Table.Cell>
            <Table.Cell>
              <h3 className="ui blue header">
                {this.props.position
                  ? `${numeral(this.props.position.quantity).format(
                      "0,0"
                    )} Shares`
                  : "0 Shares"}
              </h3>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <h3 className="ui blue header">Available Cash</h3>
            </Table.Cell>
            <Table.Cell>
              <h3 className="ui blue header">
                {numeral(this.props.portfolio.cash).format("$0,0.00")}
              </h3>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}
const mapStateToProps = state => {
  return {
    position: state.position,
    portfolio: state.portfolio
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(MyTradeInfo)
);

// <div>
//   <h2>
//     {this.props.position
//       ? `Current Position: ${numeral(this.props.position.quantity).format(
//           "0,0"
//         )} Shares`
//       : "Open a position by buying this stock!"}
//   </h2>
//   <h2>
//     Available Cash: {numeral(this.props.portfolio.cash).format("$0,0.00")}
//   </h2>
// </div>
// ${numeral(this.props.position.quantity).format("0,0")} Shares`
