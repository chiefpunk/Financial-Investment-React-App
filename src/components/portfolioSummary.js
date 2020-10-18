import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Table,
  Modal,
  Header,
  Button,
  Icon,
  Input,
  Grid
} from "semantic-ui-react";
import { postingPosition } from "../redux/actions";
import { adjustingCash } from "../redux/actions";
import PortfolioChart from "../components/portfolioChart";
var numeral = require("numeral");

class PortfolioSummary extends Component {
  state = {
    modalOpen1: false,
    modalOpen2: false,
    ticker: "",
    shares: "",
    costBasis: "",
    newCash: 0
  };

  handleOpen1 = () => this.setState({ modalOpen1: true });

  handleClose1 = () => this.setState({ modalOpen1: false });

  handleOpen2 = () => this.setState({ modalOpen2: true });

  handleClose2 = () => this.setState({ modalOpen2: false });

  handleTickerChange = ticker => this.setState({ ticker });
  handleSharesChange = shares => this.setState({ shares });
  handleCostBasisChange = costBasis => this.setState({ costBasis });
  handleCashChange = newCash => this.setState({ newCash });

  handleSave1 = () => {
    this.handleClose1();
    this.props.postingPosition(
      this.state.ticker,
      this.state.shares,
      this.state.costBasis,
      this.props.portfolio.id,
      this.props.user.id
    );
  };

  handleSave2 = () => {
    this.handleClose2();
    this.props.adjustingCash(
      this.state.newCash,
      this.props.match.params.id,
      this.props.user.id
    );
  };

  render() {
    if (!this.props.portfolio.positions) {
      return (
        <div className="ui active text centered inline loader">
          Loading Portfolio Summary
        </div>
      );
    } else if (this.props.portfolio.positions.length === 0) {
      let invested = 0;
      return (
        <Fragment>
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="2">
                  Portfolio Summary
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row className="">
                <Table.Cell className="">Cash</Table.Cell>
                <Table.Cell className="">
                  {numeral(this.props.portfolio.cash).format("$0,0.00")}
                </Table.Cell>
              </Table.Row>
              <Table.Row className="">
                <Table.Cell className="">Invested</Table.Cell>
                <Table.Cell className="">
                  {numeral(invested).format("$0,0.00")}
                </Table.Cell>
              </Table.Row>
              <Table.Row className="">
                <Table.Cell className="">Total</Table.Cell>
                <Table.Cell className="">
                  {numeral(this.props.portfolio.cash + invested).format(
                    "$0,0.00"
                  )}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Modal
            trigger={
              <Button color="blue" onClick={this.handleOpen1} inverted>
                Add Position
              </Button>
            }
            open={this.state.modalOpen1}
            onClose={this.handleClose1}
            size="small"
          >
            <Header icon="browser" content="Add New Position" />
            <Modal.Content>
              Ticker
              <input
                onChange={e =>
                  this.handleTickerChange(e.target.value.toUpperCase())
                }
                type="text"
                value={this.state.ticker}
              />
              Shares
              <input
                onChange={e => this.handleSharesChange(e.target.value)}
                type="number"
                value={this.state.shares}
              />
              Cost Basis $
              <input
                onChange={e => this.handleCostBasisChange(e.target.value)}
                type="number"
                value={this.state.costBasis}
              />
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" onClick={this.handleSave1} inverted>
                <Icon name="checkmark" /> Save
              </Button>
              <Button color="red" onClick={this.handleClose1} inverted>
                <Icon name="x" /> Cancel
              </Button>
            </Modal.Actions>
          </Modal>
          <Modal
            trigger={
              <Button color="green" onClick={this.handleOpen2} inverted>
                Edit Cash
              </Button>
            }
            open={this.state.modalOpen2}
            onClose={this.handleClose2}
            size="small"
          >
            <Header icon="browser" content="Edit Cash" />
            <Modal.Content>
              Cash:
              <input
                onChange={e => this.handleCashChange(e.target.value)}
                type="number"
                value={this.state.newCash}
              />
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" onClick={this.handleSave2} inverted>
                <Icon name="checkmark" /> Save
              </Button>
              <Button color="red" onClick={this.handleClose2} inverted>
                <Icon name="x" /> Cancel
              </Button>
            </Modal.Actions>
          </Modal>
        </Fragment>
      );
    } else {
      let investments = this.props.portfolio.positions.map(p => {
        return p.quantity * p.info.quote.latestPrice;
      });
      let invested = investments.reduce((x, y) => {
        return x + y;
      });

      return (
        <Fragment>
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="2">
                  Portfolio Summary
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row className="">
                <Table.Cell className="">Cash</Table.Cell>
                <Table.Cell className="">
                  {numeral(this.props.portfolio.cash).format("$0,0.00")}
                </Table.Cell>
              </Table.Row>
              <Table.Row className="">
                <Table.Cell className="">Invested</Table.Cell>
                <Table.Cell className="">
                  {numeral(invested).format("$0,0.00")}
                </Table.Cell>
              </Table.Row>
              <Table.Row className="">
                <Table.Cell className="">Total</Table.Cell>
                <Table.Cell className="">
                  {numeral(this.props.portfolio.cash + invested).format(
                    "$0,0.00"
                  )}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Grid>
            <PortfolioChart className="piechart" />
            <div>
              <Modal
                centered={false}
                trigger={
                  <Button
                    className="posbut"
                    color="blue"
                    onClick={this.handleOpen1}
                    inverted
                  >
                    Add Position
                  </Button>
                }
                open={this.state.modalOpen1}
                onClose={this.handleClose1}
                size="mini"
              >
                <Header icon="browser" content="Add New Position" />
                <Modal.Content>
                  <Input
                    onChange={e =>
                      this.handleTickerChange(e.target.value.toUpperCase())
                    }
                    type="text"
                    value={this.state.ticker}
                    label="Ticker"
                    placeholder="e.g. AMZN"
                  />
                  <Input
                    onChange={e => this.handleSharesChange(e.target.value)}
                    type="number"
                    value={this.state.shares}
                    label="Shares"
                    placeholder="e.g. 100"
                  />
                  <Input
                    onChange={e => this.handleCostBasisChange(e.target.value)}
                    type="number"
                    value={this.state.costBasis}
                    label="Price $"
                    placeholder="e.g. 30.00"
                  />
                </Modal.Content>
                <Modal.Actions>
                  <Button color="green" onClick={this.handleSave1} inverted>
                    <Icon name="checkmark" /> Save
                  </Button>
                  <Button color="red" onClick={this.handleClose1} inverted>
                    <Icon name="x" /> Cancel
                  </Button>
                </Modal.Actions>
              </Modal>
              <br />
              <Modal
                id="cashbut"
                centered={false}
                trigger={
                  <Button color="green" onClick={this.handleOpen2} inverted>
                    Edit Cash
                  </Button>
                }
                open={this.state.modalOpen2}
                onClose={this.handleClose2}
                size="mini"
              >
                <Header icon="browser" content="Edit Cash" />
                <Modal.Content>
                  <Header as="h2" color="blue">
                    Total Cash
                  </Header>
                  <Input
                    onChange={e => this.handleCashChange(e.target.value)}
                    type="number"
                    value={this.state.newCash}
                    size="big"
                  />
                </Modal.Content>
                <Modal.Actions>
                  <Button color="green" onClick={this.handleSave2} inverted>
                    <Icon name="checkmark" /> Save
                  </Button>
                  <Button color="red" onClick={this.handleClose2} inverted>
                    <Icon name="x" /> Cancel
                  </Button>
                </Modal.Actions>
              </Modal>
            </div>
          </Grid>
        </Fragment>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    portfolio: state.portfolio,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postingPosition: (ticker, quantity, price, portfolioId, userId) => {
      dispatch(postingPosition(ticker, quantity, price, portfolioId, userId));
    },
    adjustingCash: (newCash, portfolioId, userId) => {
      dispatch(adjustingCash(newCash, portfolioId, userId));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PortfolioSummary)
);
