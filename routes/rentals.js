const express = require("express");
const router = express.Router();
const Fawn = require("fawn");
const mongoose = require("mongoose");

const { Rentals, validateRental } = require("../models/rentals");
const { Customer } = require("../models/customers");
const { Movie } = require("../models/movie");

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rentals = await Rentals.find().sort("-dateOut");
  res.status(200).send(rentals);
});

router.get("/:id", async (req, res) => {
  const rental = await Rentals.findById(req.params.id);
  if (!rental) return res.status(404).send("Rental not found");
  res.status(200).send(rental);
});

router.post("/", async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Customer not found");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Movie not found");
  if (movie.numberOfStocks === 0)
    return res.status(404).send("Movie Out of stock");

  let rental = {
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  };
  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update("movies", { _id: movie._id }, { $inc: { numberOfStocks: -1 } })
      .run();
    res.status(200).send(rental);
  } catch (error) {
    res.status(500).send("Something failed");
  }
});

router.delete("/:id", async (req, res) => {
  const rental = await Rentals.findByIdAndRemove(req.params.id);
  if (!rental) return res.status(400).send("Rental not found");
  res.status(200).send(rental);
});

module.exports = router;
