const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const supplierSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    lowercase: true,
    minLength: [3, "Name must be at least 3 char"],
    maxLength: [100, "Name must not be greater than 100"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Provide a valid Email"],
    trim: true,
    lowercase: true,
    unique: true,
  },
  brand: {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    id: {
      type: ObjectId,
      required: true,
      ref: "Brand",
    },
  },
  contactNumber: [
    {
      type: String,
      required: [true, "Please prove a contact number"],
      validate: {
        validator: (value) => {
          return validator.isMobilePhone(value);
        },
        message: "Please provide a valid phone number",
      },
    },
],
  
  emergencyContactNumber: {
    type: String,
    required: [true, "Please provide a contact number"],
    validate: {
      validator: (value) => {
        return validator.isMobilePhone(value);
      },
      message: "Please provide a valid phone number",
    },
  },

  tradeLicenceNumber: {
    type: Number,
    required: [true, "Please prove a licence number"],
  },
  presentAddress: {
    type: String,
    required: [true, "Please prove a present address"],
  },
  permanentAddress: {
    type: String,
    required: [true, "Please prove a permanent address"],
  },
  location: {
    type: String,
    trim: true,
    required: [true, "Please provide brand name"],
    lowercase: true,
    enum: {
      values: [
        "dhaka",
        "chattogram",
        "rajshahi",
        "khulna",
        "barishal",
        "rangpur",
        "mymensing",
      ],
      message: "{VALUE} is not a valid name",
    },
  },
  imageURL: {
    type: String,
    validate: [validator.isURL, "Please provide a valid image url"],
  },
  nationalIdImageURL: {
    type: String,
    required: true,
    validate: [validator.isURL, "Please provide a valid image url"],
  },
  status: {
    type: String,
    default: "active",
    enum: ["active", "inactive"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
