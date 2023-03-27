const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;
const validator = require("validator");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide product name"],
        trim: true,
        unique: [true, "Please provide unique name"],
        minLength: [3, "Name is too short"],
        maxLength: [100, "Name is too long"],
      },
      description: {
        type: String,
        required: true,
      },
  
      unit: {
        type: String,
        required: true,
        enum: {
          values: ["kg", "litre", "pcs", "bag"],
          message: "Invalid {value}, must be kg/litre/pcs/bag",
        },
      },
      imgageURLs: [
        {
          type: String,
          required: true,
          validator: {
            validator: (value) => {
              if (Array.isArray(value)) {
                return false;
              }
              let isValid = true;
              value.forEach((url) => {
                if (!validator.isUrl(url)) {
                  isValid = false;
                }
              });
              return isValid;
            },
            message: "Please provide valid image urls",
          },
        },
      ],
      category: {
        type: String,
        required: true,
      },
      brand: {
        name: {
          type: String,
          required: true,
        },
        id: {
          type: ObjectId,
          ref: "Brand",
          required: true,
        },
      },
    },
    { timestamps: true }
  );
  
  // Mongoose middle wares for saving data: pre/post
/*   productSchema.pre('save',function(next){
    console.log("Before Saving Data")
    next()
  })

  productSchema.post('save',function(doc,next){
    console.log("After Saving Data")
    next()
  }) */

productSchema.methods.logger=function(){
    console.log(`Data Saved for ${this.name}`)
}


  const Product = mongoose.model("Product",productSchema);
  module.exports = Product;
  