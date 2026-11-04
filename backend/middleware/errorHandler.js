// Central error handler. Keep as the LAST middleware in server.js.
const errorHandler = (err, req, res, next) => {
  console.error('[ERROR]', err.stack || err.message);

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;