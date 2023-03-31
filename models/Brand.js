const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types;
const {setFlagFromString} = require("v8");
const validator = require("validator")

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide brand name"],
        maxLength: 100,
        unique: true,
        lowercase: true,
      },
      description: String,
      email: {
        type: String,
        validator: [validator.isEmail, "Please enter a valid email"],
        lowercase: true,
      },
      website: {
        type: String,
        validator: [validator.isURL, "Please Provide a valid url"],
      },
      location: String,
      products: [
        {
          type: ObjectId,
          ref: "Product",
        },
      ],
      suppliers: [
        {
          name: String,
          contactNumber: String,
          id: {
            type: ObjectId,
            ref: "Supplier",
          },
        },
      ],
})

const Brand = mongoose.model("Brand",brandSchema)
module.exports = Brand;