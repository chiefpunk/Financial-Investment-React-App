import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { uniqBy } from "lodash";
import { Table, List } from "semantic-ui-react";

class NewsContainer extends PureComponent {
  render() {
    return !this.props.portfolio ? (
      <div>Loading</div>
    ) : (
      <List size={"large"} animated bulleted>
        <List.Header as={"h1"} className="ui header blue">
          Watchlist News
        </List.Header>

        {uniqBy(this.props.watchlist, "ticker").map(item => {
          return item.news.map(news => {
            return (
              <List.Item key={news.url}>
                <a
                  href={`${news.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {news.headline}
                </a>
              </List.Item>
            );
          });
        })}
      </List>
    );
  }
}
const mapStateToProps = state => {
  return {
    portfolio: state.portfolio,
    watchlist: state.watchlist
  };
};

export default withRouter(connect(mapStateToProps)(NewsContainer));
