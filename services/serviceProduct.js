const Product = require("../models/Product");

exports.createProductServices = async(data)=>{
    const products = await Product.create(data);
    return products;
}

exports.getProductServices = async(data)=>{
    const products = await Product.find();
    return products;

 /* 
    => or
    Product.find({$or:[{_id:"rer"},{name:"sdf"}]}) 
    => ne
    Product.find({status:{$ne:"out-of-stock"}});
    => gt,gte,lt
    Product.find({quantity: {$gt:100}})
    => in
    Product.find({name:{$in:"cal","dal"}})
    
    Projection
    Product.find({},'name quantity')
    Product.find({},'-name -quantity') // will show except name and quantity
    
    limit,sort
    Product.find({}).limit(1);
    Product.find({}).sort({quantity:-1}) // will show Descending order
    select
    Product.find({}).select({name:1}) // only name show
   
    Mongoose give query builder
    Product.where("name").equals("cal").where("quantity").gt(100)
        Product.where("name").equals(/\w/)
        .where("quantity").lt(200)
        .gt(100)
        .limit(2)

    Findone
    const product =await Product.findById("were234234234234");
    

 */

}