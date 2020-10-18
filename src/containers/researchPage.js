import React, { Component } from "react";
import Watchlist from "../components/watchlist";
import NewsContainer from "../components/newsContainer";
import PopularList from "../components/popularList";
import { fetchingWatchlist } from "../redux/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Grid } from "semantic-ui-react";

class ResearchPage extends Component {
  componentDidMount() {
    this.props.fetchingWatchlist(this.props.user.id);
  }

  render() {
    return (
      <Grid>
        <Grid.Column width="3" />
        <Grid.Column width="3">
          <Watchlist />
        </Grid.Column>
        <Grid.Column width="7">
          <NewsContainer />
        </Grid.Column>
        <Grid.Column width="3" />
      </Grid>
    );
  }
}
const mapStateToProps = state => {
  return {
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
  )(ResearchPage)
);
