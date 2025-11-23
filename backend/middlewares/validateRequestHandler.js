import { validationResult } from 'express-validator'

export const validateRequestHandler = (req, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed')
    error.statusCode = 400
    error.errors = errors.array()
    return next(error)
  }

  next()
}
