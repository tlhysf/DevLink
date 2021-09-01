import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

const demo = {
  email: "example1@email.com",
  password: "123456",
};

const space = <>&nbsp;&nbsp;&nbsp;</>;

const field = (key) => (
  <div>
    {space}
    {space}
    <i>{key}:</i>
    {space}
    <strong>{demo[key]}</strong>
  </div>
);

const demoHelperText = (
  <small
    style={{
      color: "gray",
    }}
  >
    {field("email")}
    {field("password")}
  </small>
);

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: demo.email,
      password: demo.password,
      errors: {},
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  }

  render() {
    const errors = this.state.errors;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  errors={errors.email}
                  value={this.state.email}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  name="password"
                  placeholder="Password"
                  type="password"
                  errors={errors.password}
                  value={this.state.password}
                  onChange={this.onChange}
                />

                {demoHelperText}

                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="Login"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStatetoProps, { loginUser })(Login);
