import React from "react";
import Joi from "joi";
import _ from "lodash";
import Input from "../../components/common/Input";
import { connect } from "react-redux";
import { signIn } from "../../actions/authAction";
import Button from "../../components/common/Button";
import "./style.css";

class Login extends React.Component {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  componentDidUpdate(prevProps) {
    if (this.props.loggedIn && !prevProps.loggedIn) {
      this.props.history.push("/");
    }
  }

  schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().required().label("Password"),
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validateProperty = (input) => {
    const { name, value } = input;
    const obj = { [name]: value };
    const subSchema = Joi.object({ [name]: this.schema[name] });
    const { error } = subSchema.validate(obj);
    return error ? error.details[0].message : null;
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.object(this.schema).validate(
      this.state.data,
      options
    );
    if (!error) return null;

    const errors = {};
    error.details.forEach(
      (element) => (errors[element.path[0]] = element.message)
    );
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    if (_.isEmpty(errors))
      this.props.signIn(this.state.data, this.props.history);
  };

  render() {
    const { data, errors } = this.state;
    const { email, password } = data;
    const { authMessage } = this.props;
    return (
      <div className="background-container pt-5">
        <div className="container">
          <h1 className="header">Login</h1>
          <form onSubmit={this.handleSubmit}>
            <Input
              name="email"
              label="Email"
              type="email"
              error={errors["email"]}
              iconClass="fas fa-envelope"
              onChange={this.handleChange}
              placeholder="Please enter your email..."
              value={email}
              autoFocus
            />
            <Input
              name="password"
              type="password"
              label="Password"
              error={errors["password"]}
              iconClass="fas fa-key"
              onChange={this.handleChange}
              placeholder="Please enter your password..."
              value={password}
            />
            {authMessage && <p className="text-white">{authMessage}</p>}
            <Button disabled={this.validate()} type="submit" label="Login" />
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    authMessage: state.auth.authMessage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds, history) => dispatch(signIn(creds, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
