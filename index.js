const express = require("express");
const app = express();
const mongoose = require("mongoose");

const home = require("./routes/home");
const genres = require("./routes/genres");
const customers = require("./routes/customers");

const port = 5000 || process.env.PORT;
const URI =
  "mongodb+srv://rupesh:rana@cluster0.lo1ni.mongodb.net/vidly?retryWrites=true&w=majority";

app.use(express.json());
app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/users", customers);

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
