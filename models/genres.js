const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Genre = mongoose.model("Genre", genreSchema);

//* Validation Function
const validateSchema = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(100).required(),
  });
  return schema.validate(genre);
};

exports.Genre = Genre;
exports.validation = validateSchema;
