const { deleteModel } = require("mongoose");
const Product = require("../models/Product");

exports.createProductServices = async(data)=>{
    const products = await Product.create(data);
    return products;
}

exports.getProductServices = async(filters,queries)=>{
    const products = await Product.find({})
    .skip(queries.skip)
    .limit(queries.limit)
    .sort(queries.sortBy)
    .select(queries.fields)
    ;
    const totalProducts = await Product.countDocuments(filters)

    const pageCount = Math.ceil(totalProducts/queries.limit);
    return {products,totalProducts,pageCount};

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

    FindOne
    const product =await Product.findById("were234234234234");
    

 */

}

exports.productUpdateServices=async(productId,data)=>{
    const result = await Product.updateOne(
        {_id:productId},
        {$set:data},
        {runValidators:true}
    );
}

exports.productBulkUpdateServices=async(data)=>{
    const products=[];
    data.ids.forEach((product) => {
        products.push(Product.updateOne({_id:data.id},product.data));
    });
    const result = await Promise.all(products);
    return result;
}


exports.deleteProductServicesById = async(id)=>{
    const deletedProduct = await Product.deleteOne({_id:id});
    return deletedProduct;
}


exports.deleteBulkProductServices = async(ids)=>{
    const result = await Product.deleteMany({_id:ids});
    return result;
}












