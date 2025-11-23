import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = await User({ name, email, password: hashedPassword })

    res.status(201).json({
      success: true,
      message: 'User was created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    })
  } catch (err) {
    next(err)
  }
}

export const signIn = (req, res, next) => {
  try {
    const { user } = req

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    )

    res.status(200).json({
      success: true,
      message: 'Sign in was successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (err) {
    next(err)
  }
}
