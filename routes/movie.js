const express = require("express");
const { Genre } = require("../models/genres");
const router = express.Router();

const { Movie, validateMovie } = require("../models/movie");

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.status(200).send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("Movie not found");
  res.status(200).send(movie);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.detail[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send("Genre is not defined");

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  res.status(200).send(movie);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("No genre found");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );
  res.status(200).send(movie);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) return res.status(404).send("Movie not found");
  res.status(200).send(movie);
});

module.exports = router;
