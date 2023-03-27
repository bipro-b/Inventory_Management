const express = require("express")
const app = express();
const cors= require("cors");
const mongoose = require("mongoose")


// middle wires
app.use(express.json());
app.use(cors());

//Routes

const productRoute = require("./routes/routeProduct")


app.use("/api/v1/product",productRoute)



module.exports = app;