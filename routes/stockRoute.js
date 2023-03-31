const express = require("express");
const stockController = require("../controllers/stockController");
const router = express.Router();

router.route("/")
.get(stockController.getStock)
.post(stockController.createStock);

router.route("/:id")
.get(stockController.getStockById)
.patch(stockController.updateStockById);

module.exports = router;
