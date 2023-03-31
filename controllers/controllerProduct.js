const Product = require("../models/Product");
const {
  createProductServices,
  getProductServices,
  productUpdateServices,
  productBulkUpdateServices,
  deleteProductServicesById,
  deleteBulkProductServices,
} = require("../services/serviceProduct");

exports.createProduct = async (req, res, next) => {
  try {
    const result = await createProductServices(req.body);
    result.logger();

    res.status(200).json({
      status: "Success",
      message: "Data inserted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Data is not inseted",
      error: error.message,
    });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    let filters = { ...req.query };

    const excludesFilters = ["sort", "page", "limit"];
    excludesFilters.forEach((field) => delete filters[field]);
    
    // filters
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|le|lte|ne)\b/g,
      (match) => `$${match}`
    );
     
    filters=JSON.parse(filtersString);

 const queries = {};

// pagination

if(req.query.page){
    const {page=1,limit=3} = req.query;

    const skip = (page-1)*parseInt(limit);
    queries.skip=skip;
    queries.limit=parseInt(limit);
}


    // queries
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }
    if (req.query.fields) {
      const fields = req.query.split(",").join(" ");
      queries.fields = fields;
    }

    const result = await getProductServices(filters, queries);

    res.status(200).json({
      status: "Success",
      message: "Data fetched Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Can't fetch data",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productUpdateServices(id, req.body);
    res.status(200).json({
      status: "Success",
      message: "Data updated Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Can't update data.",
      error: error.message,
    });
  }
};

//Bulk Update

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const result = await productBulkUpdateServices(req.body);
    res.status(200).json({
      status: "Success",
      message: "Data updated Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Can't update data.",
      error: error.message,
    });
  }
};

// Delete

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductServicesById(id);
    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't delete the product",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Data deleted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Can't delete data.",
      error: error.message,
    });
  }
};

// bulk-delete

exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const result = await deleteBulkProductServices(req.body.ids);
    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't delete the product",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Data deleted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Can't delete data.",
      error: error.message,
    });
  }
};
