const express = require("express");
const router = express.Router();

const { User, validation } = require("../models/customers");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("User not found");
  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = new User({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  user = await user.save();
  res.status(200).send(user);
});

router.put("/:id", async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    { new: true }
  );
  if (!user) return res.status(400).send("User not found");
  res.status(200).send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) return res.status(404).send("User not found");
  res.status(200).send(user);
});

module.exports = router;
