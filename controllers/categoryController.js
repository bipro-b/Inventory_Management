const {
    createCategoryService,
    getCategoryService,
    getCategoryByIdService,
    updateCategoryByIdService,
  } = require("../services/categoryService");
  
  exports.createCategory = async (req, res, next) => {
    try {
      const result = await createCategoryService(req.body);
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
  
  exports.getCategory = async (req, res, next) => {
    try {
      const result = await getCategoryService();
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
  
  exports.getCategoryById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await getCategoryByIdService(id);
      if (!result) {
        return res.status(400).json({
          status: "fail",
          error: "Couldn't find a category with this id",
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
  
  exports.updateCategoryById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await updateCategoryByIdService(id, req.body);
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
  