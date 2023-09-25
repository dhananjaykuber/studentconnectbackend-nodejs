const { TaskModel } = require('../../../models');
const sendNotification = require('../../../utils/sendNotification');

const addComment = async (req, res) => {
  const { taskId } = req.params;
  const { message, commented_at, projectId } = req.body;

  try {
    const data = await TaskModel.findByIdAndUpdate(
      taskId,
      {
        $push: {
          comments: {
            user: req.user,
            text: message,
            timestamp: commented_at,
          },
        },
      },
      { new: true }
    ).populate('comments.user');

    data.assignedTo.forEach(async (userId) => {
      // reusable function created in utils
      sendNotification(
        req,
        userId,
        req.user.user_name,
        `${req.user.user_name} has commented on this : ${message}`,
        taskId,
        projectId
      );
    });

    res.status(200).json(data);
  } catch (error) {}
};

const deleteComment = async (req, res) => {
  const { taskId, commentId } = req.params;

  try {
    const data = await TaskModel.findByIdAndUpdate(
      taskId,
      {
        $pull: {
          comments: { _id: commentId },
        },
      },
      { new: true }
    );

    res.status(200).json(data);
  } catch (error) {}
};

module.exports = { addComment, deleteComment };
