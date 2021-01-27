const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const config = require("config");

const home = require("./routes/home");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movie");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

const port = 5000 || process.env.PORT;
const URI = config.get("URI");
app.use(express.json());
app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL error: jwtPrivateKey not defined");
  process.exit(1);
}

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to the Database"))
  .catch(() => console.log("Cannot connect to the Database"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
