const {
  createStockService,
  getStockService,
  getStockServiceById,
  updateStockServiceById,
} = require("../services/stockService");

exports.createStock = async (req, res, next) => {
  try {
   

    const result = await createStockService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Data inserted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

exports.getStock = async (req, res, next) => {
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

    filters = JSON.parse(filtersString);

    const queries = {};

    // pagination

    if (req.query.page) {
      const { page = 1, limit = 3 } = req.query;

      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
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

    const result = await getStockService(filters,queries);
    res.status(200).json({
      status: "Success",
      message: "Data fetched Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Data is not fetched",
      error: error.message,
    });
  }
};

exports.getStockById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getStockServiceById(id);
    if (!result) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find a stock with this id",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Data fetched Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Data is not fetched",
      error: error.message,
    });
  }
};

exports.updateStockById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateStockServiceById(id, req.body);
    res.status(200).json({
      status: "Success",
      message: "Data updated Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Data is not updated",
      error: error.message,
    });
  }
};
