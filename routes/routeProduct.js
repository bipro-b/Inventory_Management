const express = require("express")
const router = express.Router();
const productController = require("../controllers/controllerProduct")
const uploader = require("../middleware/uploader");

router.post("/file-upload",uploader.single("image"),productController.fileUpload)
// for multiple single/ array
//<input type="file" name="image" />
// const formData = new FormData();
// formData.append("image",formData)

router.route("/bulk-update").patch(productController.bulkUpdateProduct)
router.route("/bulk-delete").delete(productController.bulkDeleteProduct)

router.route("/")
.get(productController.getProduct)
.post(productController.createProduct);

router
.route("/:id")
.patch(productController.updateProduct)
.delete(productController.deleteProductById)

module.exports = router;