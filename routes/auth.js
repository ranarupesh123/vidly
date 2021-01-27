const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");

const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or Password is wrong");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Email or Password is wrong");

  const token = user.generateAuthToken();

  res.send(token);
});

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(5).max(1024),
  });
  return schema.validate(user);
};

module.exports = router;
