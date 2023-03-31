const Brand = require("../models/Brand")

exports.createBrandService=async(data)=>{

    const brands = await Brand.create(data);
    return brands;

}

exports.getBrandService= async()=>{
    const brands = await Brand.find({})
    return brands;
}
exports.getBrandServiceById=async(id)=>{
    const brand = await Brand.findOne({_id:id});
    return brand;
}