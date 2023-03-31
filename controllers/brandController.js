const {
  createBrandService,
  getBrandService,
  getBrandServiceById,
  updateBrandServiceById,
} = require("../services/brandService");

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);
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
exports.getBrand = async (req, res, next) => {
  try {
    const result = await getBrandService();
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

exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getBrandServiceById(id);
    if (!result) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find a brand with this id",
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

exports.updateBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateBrandServiceById(id, req.body);
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
