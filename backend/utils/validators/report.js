import { body } from 'express-validator'

export const validation = [
  body('status').isIn(['lost', 'found']).withMessage("Status must be either 'lost' or 'found'"),

  body('type').notEmpty().withMessage('Pet type is required'),

  body('location').notEmpty().withMessage('Location is required'),

  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 15 })
    .withMessage('Description must be at least 15 characters long'),

  body('contact').notEmpty().withMessage('Contact information is required')
]
