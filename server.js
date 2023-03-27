const mongoose = require("mongoose");
// const { MongoClient } = require("mongodb");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = require("./app");

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v2bif.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// database connection for mongoose
mongoose.connect(process.env.DATABASE).then(() => {
  console.log(`Database connection is successful`.green.bold);
});
//  Connecction with mongoDB

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v2bif.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

/* const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); */
//server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});