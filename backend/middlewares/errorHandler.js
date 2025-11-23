export const errorHandler = (err, req, res, _) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || []
  })
}
