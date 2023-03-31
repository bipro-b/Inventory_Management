const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const { setFlagsFromString } = require("v8");
const validator = require("validator");

const storeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide brand name"],
      lowercase: true,
      enum: {
        values: [
          "dhaka",
          "chittagong",
          "rajshahi",
          "khulna",
          "barishal",
          "rangpur",
          "mymensing",
        ],
        message: "{VALUE} is not a valid name",
      },
    },
    description: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    manager: {
      name: String,
      contactNumner: String,
      id: {
        type: ObjectId,
        ref: "User",
      },
    },
  },
  { timestamps: true }
);
const Store = mongoose.model("Store", storeSchema);

module.exports = Store;