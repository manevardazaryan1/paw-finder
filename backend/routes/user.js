import express from 'express'
import {
  signUpValidationHandler,
  signInValidationHandler
} from '../utils/validators/user.js'
import { validateRequestHandler } from '../middlewares/validateRequestHandler.js'
import { signUp, signIn } from '../controllers/user.js'

const router = express.Router()

router.post('/sign-up', signUpValidationHandler, validateRequestHandler, signUp)
router.post('sign-in', signInValidationHandler, validateRequestHandler, signIn)

export default router
