import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleSearchChange } from "../redux/actions";
import { searching } from "../redux/actions";

class SearchBar extends Component {
  routeChange = () => {
    let path = `/trade/${this.props.search}`;
    this.props.history.push(path);
  };

  onKeyPress = e => {
    if (e.key === "Enter") {
      this.routeChange();
      this.props.searching(this.props.search, this.props.portfolio.id);
    }
  };

  render() {
    return (
      <div>
        <div className="ui labeled icon input">
          <div className="ui label label">TICKER:</div>
          <input
            type="text"
            onChange={e =>
              this.props.handleSearchChange(e.target.value.toUpperCase())
            }
            value={this.props.search}
            placeholder="Enter Symbol..."
            onKeyPress={this.onKeyPress}
          />
          <i
            aria-hidden="true"
            className="search icon l primary link "
            onClick={() => {
              this.routeChange();
              this.props.searching(this.props.search, this.props.portfolio.id);
            }}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    search: state.search,
    portfolio: state.portfolio
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSearchChange: text => {
      dispatch(handleSearchChange(text));
    },
    searching: (searchTerm, portfolioId) => {
      dispatch(searching(searchTerm, portfolioId));
    }
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchBar)
);
