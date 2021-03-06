const express = require("express");
const router = express.Router();

const { Genre, validateGenre } = require("../models/genres");

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.status(200).send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Genre not found");
  res.status(200).send(genre);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.status(200).send(genre);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Genre not found");

  genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("Genre not found");
  res.status(200).send(genre);
});

module.exports = router;
