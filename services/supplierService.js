const Supplier = require("../models/Supplier");

exports.createSupplierService = async (data) => {
  const supplier = await Supplier.create(data);
  return supplier;
};

exports.getSupplierService = async () => {
  const suppliers = await Supplier.find({});
  return suppliers;
};

exports.getSupplierByIdService = async (id) => {
  const supplier = await Supplier.findOne({ _id: id });
  return supplier;
};

/* exports.updateSupplierByIdService = async (id, data) => {
  const supplier = await Supplier.updateOne(
    { _id: id },
    { $set: data },
    { runValidators: true }
  );
  return supplier;
}; */

exports.updateSupplierByIdService = async (id, data) => {
  const supplier = await Supplier.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return supplier;
};
