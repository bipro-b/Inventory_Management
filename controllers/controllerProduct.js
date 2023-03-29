const Product = require("../models/Product")
const { createProductServices, getProductServices, productUpdateServices, productBulkUpdateServices, deleteProductServicesById } = require("../services/serviceProduct")

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

exports.updateProduct = async(req,res,next)=>{
    try {
        const {id}= req.params;
        const result = await productUpdateServices(id,req.body);    
        res.status(200).json({
            status:"Success",
            message:"Data updated Successfully",
            data:result
        })
    
        
      } catch (error) {
        res.status(400).json({
            status:"Fail",
            message:"Can't update data.",
            error: error.message
        })
      }
}

//Bulk Update

exports.bulkUpdateProduct=async(req,res,next)=>{
    try {
    
       
        const result = await productBulkUpdateServices(req.body);    
        res.status(200).json({
            status:"Success",
            message:"Data updated Successfully",
            data:result
        })
    
        
      } catch (error) {
        res.status(400).json({
            status:"Fail",
            message:"Can't update data.",
            error: error.message
        })
      }
}

// Delete

exports.deleteProductById=async(req,res,next)=>{
    try {

        const {id}=req.params;
        const result = await deleteProductServicesById(id);
        if(!result.deletedCount){
            return res.status(400).json({
                status:"fail",
                error:"Couldn't delete the product"
            })
        }
        
        res.status(200).json({
            status:"Success",
            message:"Data deleted Successfully",
            data:result
        })
        
    } catch (error) {
        res.status(400).json({
            status:"Fail",
            message:"Can't delete data.",
            error: error.message
        })
        
    }
}


