const express = require("express")
const app = express();
const cors= require("cors");
const mongoose = require("mongoose")


// middle wires
app.use(express.json());
app.use(cors());

//Routes

const productRoute = require("./routes/routeProduct")
const brandRoute = require("./routes/brandRoute");

app.use("/api/v1/product",productRoute)
app.use("/api/v1/brand",brandRoute)




module.exports = app;