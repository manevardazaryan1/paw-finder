import { body } from 'express-validator'
import { User } from '../../models/user.js'
import bcrypt from 'bcryptjs'

export const signUpValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .custom(async (email) => {
      const existingUser = await User.findOne({ where: { email } })
      if (existingUser) {
        throw new Error('Email already in use')
      }
      return true
    }),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .custom((password, { req }) => {
      if (password !== req.body.confirmPassword) {
        throw new Error('Passwords do not match')
      }
      return true
    })
]

export const signInValidation = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ where: { email } })
      if (!user) {
        throw new Error('User with this email does not exist')
      }
      req.user = user
      return true
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .custom(async (password, { req }) => {
      let isMatch = false

      if (req.user) {
        isMatch = await bcrypt.compare(password, req.user?.password)
      }

      if (!isMatch) {
        const error = new Error('Invalid password')
        error.statusCode = 401
        throw error
      }
      return true
    })
]
