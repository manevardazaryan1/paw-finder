import express from 'express'
import { upload } from '../config/multer.js'
import { getAll, getById, create, update, destroy } from '../controllers/report.js'
import { validation } from '../utils/validators/report.js'
import { validateRequestHandler } from '../middlewares/validateRequestHandler.js'
import { auth } from '../middlewares/auth.js'
import { authorization } from '../middlewares/authorization.js'

const router = express.Router()

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', auth, upload.single('image'), validation, validateRequestHandler, create)
router.put(
  '/:id',
  auth,
  authorization,
  upload.single('image'),
  validation,
  validateRequestHandler,
  update
)
router.delete('/:id', auth, authorization, destroy)

export default router
