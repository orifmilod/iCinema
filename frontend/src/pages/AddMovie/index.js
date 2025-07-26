import React from "react";
import Joi from "joi";
import { connect } from "react-redux";

import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import { Button } from "../../components/common";
import { addMovie } from "../../actions/moviesAction";
import { getGenres } from "../../actions/genreAction";
import { movieSchema } from "./schema";

class AddMovieForm extends React.Component {
  _isMounted = false;

  state = {
    data: {
      title: "",
      genre: "",
      rate: "",
      description: "",
      image: null,
      trailerLink: "",
      movieLength: "",
    },
    errors: {},
  };

  componentDidMount() {
    this._isMounted = true;
    this.props.getGenres();
  }

  componentDidUpdate(prevProps) {
    if (this.props.genres.length > 0 && prevProps.genres.length === 0) {
      this.setState((prevState) => ({
        data: {
          ...prevState.data,
          genre: this.props.genres[0]._id,
        },
      }));
    }
  }

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = this.state;
    const { error } = movieSchema.validate(data);
    this.setState({ errors: error ? error.details : {} });
    if (error) {
      console.log("Validation error:", error.details);
      return;
    }
    try {
      await this.props.addMovie(data, this.props.history);
      if (this._isMounted) {
        this.setState({
          data: {
            title: "",
            genre: "",
            rate: "",
            description: "",
            image: null,
            trailerLink: "",
            movieLength: "",
          },
          errors: {},
        });
      }
    } catch (err) {
      console.error("Error adding movie:", err);
    }
  };

  uploadImage = (e) => {
    if (e.target.files[0]) {
      const data = { ...this.state.data };
      data.image = e.target.files[0];
      this.setState({ data });
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { errors, data } = this.state;
    const { title, genre, rate, description, trailerLink, movieLength } = data;
    const { genres } = this.props;

    return (
      <div className="background-container pt-5 pb-3">
        <div className="container">
          <h1 className="header">Add a new movie</h1>

          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <Input
              name="title"
              value={title}
              label="Title"
              onChange={this.handleChange}
              placeholder="Enter the title..."
              error={errors["title"]}
              iconClass="fas fa-film"
              autoFocus
            />

            <Select
              name="genre"
              label="Genre"
              onChange={this.handleChange}
              value={genre}
              error={errors["genre"]}
              options={genres}
              iconClass="fas fa-address-card"
            />

            <Input
              name="rate"
              label="Rating"
              onChange={this.handleChange}
              placeholder="Enter the rating..."
              error={errors["rate"]}
              iconClass="fas fa-star"
              value={rate}
              type="number"
            />

            <Input
              name="image"
              label="Cover Image"
              onChange={this.uploadImage}
              error={errors["coverImage"]}
              iconClass="fas fa-file-image"
              accept="image/*"
              type="file"
            />

            <Input
              name="trailerLink"
              label="Trailer Link"
              onChange={this.handleChange}
              placeholder="Enter the trailer link..."
              error={errors["trailerLink"]}
              iconClass="fas fa-link"
              value={trailerLink}
            />

            <Input
              name="movieLength"
              label="Movie Length"
              onChange={this.handleChange}
              placeholder="Enter the movie length..."
              error={errors["movieLength"]}
              iconClass="fas fa-clock"
              value={movieLength}
            />

            <Input
              name="description"
              label="Description"
              placeholder="Enter description about this movie..."
              iconClass="fas fa-info"
              error={errors["description"]}
              type="textarea"
              value={description}
              onChange={this.handleChange}
            />
            <Button type="submit" label="Add Movie" />
          </form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dipatch) => {
  return {
    addMovie: (movie, history) => dipatch(addMovie(movie, history)),
    getGenres: () => dipatch(getGenres()),
  };
};

const mapStateToProps = (state) => {
  return {
    genres: state.genre.genres,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMovieForm);
