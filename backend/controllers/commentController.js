import asyncHandler from '../middleware/asyncHandler.js'
import Comment from '../models/comment.js'

// @desc    Get all comments
// @route   GET /api/comments
// @access  Public
const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find()
  res.json(comments)
})

// @desc    Get single comment by ID
// @route   GET /api/comments/:id
// @access  Public
const getCommentById = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id)
  if (comment) {
    res.json(comment)
  } else {
    res.status(404)
    throw new Error("Le commentaire n'a pas été trouvé")
  }
})

// @desc    Create a new comment
// @route   POST /api/comment
// @access  Private
const createComment = asyncHandler(async (req, res) => {
  const { simulationId, title, content } = req.body

  const comment = new Comment({
    title,
    content,
    simulationId,
  })

  const createdComment = await comment.save()
  res.status(201).json(createdComment)
})

// @desc    Update a comment
// @route   PUT /api/comments/:id
// @access  Private/Admin
const updateComment = asyncHandler(async (req, res) => {
  const { title, content } = req.body

  const comment = await Comment.findById(req.params.id)
  if (comment) {
    comment.content = content || comment.content
    comment.title = title || comment.title

    const updatedComment = await comment.save()
    res.json(updatedComment)
  } else {
    res.status(404)
    throw new Error("Le comment n'a pas été trouvé")
  }
})

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id)
  if (comment) {
    await Comment.deleteOne({ _id: req.params.id })
    res.json({ message: 'Commentaire Suprimée' })
  } else {
    res.status(404)
    throw new Error("Le commentaire n'a pas été trouvé")
  }
})

export {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
}
