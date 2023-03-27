const express = require("express")
const productController = require("../controllers/controllerProduct")
const router = express.Router();

router.route("/")
.get(productController.getProduct).
post(productController.createProduct);

module.exports = router;