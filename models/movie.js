const mongoose = require("mongoose");
const Joi = require("joi");

const { genreSchema } = require("../models/genres");

const movieSchema = mongoose.Schema({
  title: { type: String, required: true, minLength: 3, maxLength: 255 },
  genre: { type: genreSchema, required: true },
  numberInStock: { type: Number, required: true, min: 0, max: 255 },
  dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
});

const Movie = mongoose.model("Movie", movieSchema);

//* Validation function
const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });
  return schema.validate(movie);
};

exports.Movie = Movie;
exports.validateMovie = validateMovie;