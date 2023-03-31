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
const categoryRoute = require("./routes/categoryRoute")
const storeRoute = require("./routes/storeRoute");
const stockRoute = require("./routes/stockRoute");


app.use("/api/v1/product",productRoute)
app.use("/api/v1/brand",brandRoute)
app.use("/api/v1/category",categoryRoute)
app.use("/api/v1/store",storeRoute)
app.use("/api/v1/stock",stockRoute)




module.exports = app;