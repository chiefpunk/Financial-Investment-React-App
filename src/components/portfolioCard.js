import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
var numeral = require("numeral");

class PortfolioCard extends Component {
  render() {
    return (
      <Card
        fluid
        color="blue"
        as={NavLink}
        to={`/portfolios/${this.props.portfolio.id}`}
      >
        <Card.Content>
          <Card.Header textAlign="center">
            {this.props.portfolio.name}
          </Card.Header>
          <Card.Meta textAlign="center">Paper Trading</Card.Meta>
          <Card.Description textAlign="center">
            {numeral(this.props.portfolio.cash).format("$0,0.00")} Available to
            trade
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default PortfolioCard;
