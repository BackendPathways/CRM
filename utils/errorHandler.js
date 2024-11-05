const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage =
    err.message || `An error occurred (Status: ${statusCode})`;

  res.status(statusCode).render('errors', {
    error: errorMessage,
    statusCode: statusCode
  });
};

module.exports = errorHandler;
