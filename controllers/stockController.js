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
      const result = await getStockService();
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
  