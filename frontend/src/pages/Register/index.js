import React from "react";
import Joi from "joi";
import Input from "../../components/common/Input";
import { connect } from "react-redux";
import { signUp } from "../../actions/authAction";

class RegisterForm extends React.Component {
  state = {
    data: {
      email: "",
      password: "",
      passwordRepeat: "",
    },
    errors: {},
    passwordError: "",
  };

  validateProperty = (input) => {
    const { name, value } = input;
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
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

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return null;

    const errors = {};
    result.error.details.forEach(
      (element) => (errors[element.path[0]] = element.message)
    );
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { password, passwordRepeat, email } = this.state.data;
    if (password !== passwordRepeat)
      this.setState({ passwordError: "The passwords doesn not match." });
    else this.props.signUp({ email, password });
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
    passwordRepeat: Joi.string().required().label("Repear Password"),
  };
  render() {
    const { authMessage, loggedIn } = this.props;
    const { errors, passwordError } = this.state;
    const { email, password, passwordRepeat } = this.state.data;
    if (loggedIn) this.props.history.push("/");

    return (
      <div className="background-container pt-5">
        <div className="container">
          <h1 className="header">Register Form</h1>
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
              label="Password"
              type="password"
              error={errors["password"]}
              iconClass="fas fa-key"
              onChange={this.handleChange}
              placeholder="Please enter your password..."
              value={password}
            />
            <Input
              name="passwordRepeat"
              type="password"
              label="Repeat Password"
              error={errors["passwordRepeat"]}
              iconClass="fas fa-key"
              onChange={this.handleChange}
              placeholder="Repeat your password..."
              value={passwordRepeat}
            />
            {authMessage || passwordError ? (
              <p className="bg-info text-white">
                {" "}
                {authMessage} {passwordError}
              </p>
            ) : (
              <> </>
            )}
            <button
              type="submit"
              className="btn special-btn"
              disabled={this.validate()}
            >
              {" "}
              Sign Up{" "}
            </button>
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
    signUp: (creds) => dispatch(signUp(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
