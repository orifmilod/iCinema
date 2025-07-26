import React from "react";
import Joi from "joi";
import { connect } from "react-redux";
import { addGenre } from "../../actions/genreAction";
import { Input, Button } from "../../components/common";

class AddGenre extends React.Component {
  state = {
    data: {
      name: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Genre"),
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

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    if (errors) {
      this.setState({ errors });
      return;
    }
    await this.props.addGenre(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    const { data, errors } = this.state;
    const { name } = data;
    return (
      <div className="background-container pt-5">
        <div className="container">
          <h1 className="header">Add Genre</h1>
          <form onSubmit={this.handleSubmit}>
            <Input
              name="name"
              label="Genre"
              type="text"
              error={errors["name"]}
              iconClass="fas fa-film"
              onChange={this.handleChange}
              placeholder="Please enter the genre..."
              value={name}
              autoFocus
            />
            <Button disabled={this.validate()} type="submit" label="Add Genre" />
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addGenre: (genre) => dispatch(addGenre(genre)),
  };
};

export default connect(null, mapDispatchToProps)(AddGenre);
