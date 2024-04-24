import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    simulationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Simulation',
    },
    title: {
      type: String,
    },

    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
