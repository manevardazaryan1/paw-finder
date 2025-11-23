import express from 'express'
import { upload } from '../config/multer.js'

const router = express.Router()

router.post(
  '/post',
  upload.single('image', () => {})
)
router.get('/', () => {})
router.get('/:id', () => {})
router.put('/:id', upload.single('image'), () => {})
router.delete('/:id', () => {})

export default router
