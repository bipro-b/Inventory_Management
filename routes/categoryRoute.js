const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

router.route("/")
.get(categoryController.getCategory)
.post(categoryController.createCategory);

router.route("/:id")
.get(categoryController.getCategoryById)
.patch(categoryController.updateCategoryById);

module.exports = router;
