import React, { Component } from "react";
import { Form, Segment, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loggingInUser } from "../redux/actions";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleLoginSubmit = () => {
    let username = this.state.username;
    let password = this.state.password;
    this.props.loggingInUser(username, password);
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Form size="small" onSubmit={this.handleLoginSubmit}>
        <Segment>
          <h2 className="ui center aligned blue header">
            <Icon name="line graph" />
            Welcome to TraderBlue!
          </h2>
          <Form.Input
            icon="user"
            iconPosition="left"
            placeholder="Username"
            name="username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <Form.Input
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />

          <Button color="blue" size="small" type="submit">
            Login
          </Button>
        </Segment>
      </Form>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loggingInUser: (username, password) => {
      dispatch(loggingInUser(username, password));
    }
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(LoginForm)
);
