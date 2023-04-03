const express = require("express")
const brandController = require("../controllers/brandController");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");
const router = express.Router();

// router.use(verifyToken)

router.route("/")
.get(verifyToken,authorization("admin") ,brandController.getBrand)
.post(brandController.createBrand)

router.route("/:id")
.get(brandController.getBrandById)
.patch(brandController.updateBrandById)

module.exports = router;