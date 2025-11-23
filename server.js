const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

const app = require("./app");

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log(`Connected to MongoDB!`.green.bold);
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});