const { NotificationModel } = require('../../../models');

const getNotifications = async (req, res) => {
  const { projectId } = req.params;

  try {
    const data = await NotificationModel.find({
      to: req.user.id,
      project: projectId,
    });

    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const updateNotification = async (req, res) => {
  const { notificationId } = req.params;
  const { status } = req.body;

  try {
    const data = await NotificationModel.findByIdAndUpdate(
      notificationId,
      {
        status: status,
      },
      { new: true }
    );

    res.status(200).json(data);
  } catch (error) {}
};

const deleteNotification = async (req, res) => {
  const { notificationId } = req.params;

  try {
    const data = await NotificationModel.findByIdAndDelete(notificationId);

    res.status(200).json(data);
  } catch (error) {}
};

module.exports = { getNotifications, updateNotification, deleteNotification };
