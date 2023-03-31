const Stock = require("../models/Stock");

exports.createStockService = async (data) => {
  const stock = await Stock.create(data);
  return stock;
};

exports.getStockService = async () => {
  const stocks = await Stock.find({});
  return stocks;
};

exports.getStockServiceById = async (id) => {
  const stock = await Stock.findOne({ _id: id });
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
