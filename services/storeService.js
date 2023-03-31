const Store = require("../models/Store");

exports.createStoreService = async (data) => {
  const stores = await Store.create(data);
  return stores;
};

exports.getStoreService = async () => {
  const stores = await Store.find({});
  return stores;
};

exports.getStoreServiceById = async (id) => {
  const store = await Store.findOne({ _id: id });
  return store;
};

exports.updateStoreServiceById = async (id, data) => {
  const store = await Store.updateOne(
    { _id: id },
    { $set: data },
    { runValidators: true }
  );
  return store;
};
