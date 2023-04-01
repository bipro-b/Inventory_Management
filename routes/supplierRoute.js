const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");

router.route("/")
.get(supplierController.getSupplier)
.post(supplierController.createSupplier);

router.route("/:id")
.get(supplierController.getSupplierById)
.patch(supplierController.updateSupplierById);

module.exports = router;
