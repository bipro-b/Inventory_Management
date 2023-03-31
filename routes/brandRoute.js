const express = require("express")
const brandController = require("../controllers/brandController")
const router = express.Router();

router.route("/")
.get(brandController.getBrand)
.post(brandController.createBrand)

router.route("/:id")
.get(brandController.getBrandById)
.patch(brandController.updateBrandById)

module.exports = router;