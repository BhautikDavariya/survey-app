function prepareSuccessResponse(data, message) {
    return {
      success: true,
      data: data,
      message: message,
      totalRecords: data.length,
    };
  }
  
  function prepareErrorResponse(message) {
    return {
      success: false,
      message: message,
    };
  }

  function errorHandling(next, error, req, res){
    const status = error.status || 500
    return res.status(status).json({
      success: false,
      massage: error.massage,

    })
  }
  
  module.exports = {
    prepareSuccessResponse,
    prepareErrorResponse,
    errorHandling
  };