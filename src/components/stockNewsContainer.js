import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchingStock } from "../redux/actions";
import { Table, List } from "semantic-ui-react";

class StockNewsContainer extends Component {
  componentDidMount() {
    this.props.fetchingStock(this.props.match.params.id);
  }
  render() {
    // let ticker = this.props.match.params.id;
    return !this.props.stock ? (
      <div>Loading</div>
    ) : (
      <List size={"large"} animated bulleted>
        <List.Header className="ui header blue" as={"h2"}>{`${
          this.props.stock.quote.companyName
        } News`}</List.Header>
        {this.props.stock.news.map(n => {
          return (
            <List.Item key={n.headline}>
              <a href={n.url} target="_blank" rel="noopener noreferrer">
                {n.headline}
              </a>
            </List.Item>
          );
        })}
      </List>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchingStock: ticker => {
      dispatch(fetchingStock(ticker));
    }
  };
};

const mapStateToProps = state => {
  return {
    stock: state.stock
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StockNewsContainer)
);
