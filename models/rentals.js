const mongoose = require("mongoose");
const Joi = require("joi");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 50,
      },
      isGold: {
        type: Boolean,
        required: true,
      },
      phone: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 255,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rentals = mongoose.model("Rentals", rentalSchema);

const validateRental = (rental) => {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return schema.validate(rental);
};

exports.validateRental = validateRental;
exports.Rentals = Rentals;