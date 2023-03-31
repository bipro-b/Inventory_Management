const Category = require("../models/Category");

exports.createCategoryService = async (data) => {
  const categories = await Category.create(data);
  return categories;
};

exports.getCategoryService = async () => {
  const categories = await Category.find({});
  return categories;
};

exports.getCategoryServiceById = async (id) => {
  const category = await Category.findOne({ _id: id });
  return category;
};

exports.updateCategoryByIdService = async (id, data) => {
  const category = await Category.updateOne(
    { _id: id },
    { $set: data },
    { runValidators: true }
  );
  return category;
};
