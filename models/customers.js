const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  isGold: { type: Boolean, required: true },
});

const User = mongoose.model("User", userSchema);

//* Validation function
const validation = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(100).required(),
    phone: Joi.number().required(),
    isGold: Joi.boolean().required(),
  });
  return schema.validate(user);
};

exports.User = User;
exports.Validation = validation;
