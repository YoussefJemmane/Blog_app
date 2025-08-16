const errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }

  const status = err.status || 500;
  res.status(status).json({
    data: null,
    error: {
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    },
  });
};

module.exports = errorHandler;
