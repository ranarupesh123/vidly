const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  isGold: { type: Boolean, required: true },
});

const Customer = mongoose.model("Customer", customerSchema);

//* Validation function
const validation = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(100).required(),
    phone: Joi.number().required(),
    isGold: Joi.boolean().required(),
  });
  return schema.validate(customer);
};

exports.Customer = Customer;
exports.validateCustomer = validation;
