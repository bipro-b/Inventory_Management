const express = require("express")
const productController = require("../controllers/controllerProduct")
const router = express.Router();


router.route("/bulk-update").patch(productController.bulkUpdateProduct)

router.route("/")
.get(productController.getProduct).
post(productController.createProduct);

router
.route("/:id")
.patch(productController.updateProduct)
.delete(productController.deleteProductById)

module.exports = router;