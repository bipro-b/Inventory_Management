const express = require("express");
const storeController = require("../controllers/storeController");
const router = express.Router();

router.route("/")
.get(storeController.getStore)
.post(storeController.createStore);

router.route("/:id")
.get(storeController.getStoreById)
.patch(storeController.updateStoreById);

module.exports = router;
