const Stock = require("../models/Stock");

exports.createStockService = async (data) => {
  const stock = await Stock.create(data);
  return stock;
};

exports.getStockService = async (filters, queries) => {
  const stocks = await Stock.find({})
    .skip(queries.skip)
    .limit(queries.limit)
    .sort(queries.sortBy)
    .select(queries.fields);
  const totalStocks = await Stock.countDocuments(filters);

  const pageCount = Math.ceil(totalStocks / queries.limit);
  return { stocks, totalStocks, pageCount };
};

exports.getStockServiceById = async (id) => {
  const stock = await Stock.findOne({ _id: id })
    .populate("store.id")
    .populate("suppliedBy.id")
    .populate("brand.id");
  return stock;
};

exports.updateStockServiceById = async (id, data) => {
  const stock = await Stock.updateOne(
    { _id: id },
    { $set: data },
    { runValidators: true }
  );
  return stock;
};
