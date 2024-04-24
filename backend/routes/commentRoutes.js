import express from 'express'

const router = express.Router()
import {
  createComment,
  deleteComment,
  getCommentById,
  getComments,
  updateComment,
} from '../controllers/commentController.js'

router.route('/').get(getComments).post(createComment),
  router
    .route('/:id')
    .get(getCommentById)
    .delete(deleteComment)
    .put(updateComment)

export default router
