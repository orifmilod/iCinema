import Joi from "joi";

export const movieSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string().required().label("Title"),
  genre: Joi.string().required().label("Genre"),
  description: Joi.string().allow("").label("Description"),
  image: Joi.object().allow(null).label("Cover Image"),
  rate: Joi.number().min(0).max(10).default(0).label("Rating"),
  trailerLink: Joi.string().allow(null, "").label("Trailer Link"),
  movieLength: Joi.string().required().label("Movie length"),
});
