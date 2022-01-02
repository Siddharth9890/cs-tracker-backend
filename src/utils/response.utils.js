const successResponse = (response, statsCode, body) => {
  return response.status(statsCode).send({
    message: "success",
    body,
  });
};

const errorResponse = (response, statsCode, error) => {
  return response.status(statsCode).send({
    message: "failed",
    error,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
