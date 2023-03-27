const Product = require("../models/Product")
const { createProductServices, getProductServices } = require("../services/serviceProduct")

exports.createProduct = async(req,res,next)=>{
    try {

        const result = await createProductServices(req.body);
        result.logger();

        res.status(200).json({
            status:"Success",
            message:"Data inserted Successfully",
            data:result
        })
        
    } catch (error) {
        res.status(400).json({
            status:"Fail",
            message:"Data is not inseted",
            error: error.message
        })
        
    }
}

exports.getProduct=async(req,res,next)=>{
  try {
    const result = await getProductServices();

    res.status(200).json({
        status:"Success",
        message:"Data fetched Successfully",
        data:result
    })

    
  } catch (error) {
    res.status(400).json({
        status:"Fail",
        message:"Can't fetch data",
        error: error.message
    })
  }
}