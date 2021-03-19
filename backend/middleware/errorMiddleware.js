//middleware to handle not found error (invalid apis like /apii/produ/)

const notFound = (req, res, next) => {
  console.log("in notfound");
  const error = new Error(`Not found ${req.originalUrl}`);

  res.status(404);
  next(error);
};

//middleware to handle errors - this runs for any call made to any api

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { errorHandler, notFound };
