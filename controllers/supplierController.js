const {
    createSupplierService,
    getSupplierService,
    getSupplierByIdService,
    updateSupplierByIdService,
  } = require("../services/supplierService");
  
  exports.createSupplier = async (req, res, next) => {
    try {
      const result = await createSupplierService(req.body);
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
  
  exports.getSupplier = async (req, res, next) => {
    try {
      const result = await getSupplierService();
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
  
  exports.getSupplierById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await getSupplierByIdService(id);
      if (!result) {
        return res.status(400).json({
          status: "fail",
          error: "Couldn't find a supplier with this id",
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
  
  exports.updateSupplierById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await updateSupplierByIdService(id, req.body);
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
  