const {
    createStoreService,
    getStoreService,
    getStoreByIdService,
    updateStoreByIdService,
    updateStoreServiceById,
  } = require("../services/storeService");
  
exports.createStore = async (req, res, next) => {
    try {
      const result = await createStoreService(req.body);
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
  
  exports.getStore = async (req, res, next) => {
    try {
      const result = await getStoreService();
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

  exports.getStoreById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await getStoreByIdService(id);
      if (!result) {
        return res.status(400).json({
          status: "fail",
          error: "Couldn't find a store with this id",
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
  
  exports.updateStoreById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateStoreServiceById(id, req.body);
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
    