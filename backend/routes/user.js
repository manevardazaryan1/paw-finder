import express from 'express'
import { signUpValidation, signInValidation } from '../utils/validators/user.js'
import { validateRequestHandler } from '../middlewares/validateRequestHandler.js'
import { signUp, signIn } from '../controllers/user.js'

const router = express.Router()

router.post('/sign-up', signUpValidation, validateRequestHandler, signUp)
router.post('/sign-in', signInValidation, validateRequestHandler, signIn)

export default router
