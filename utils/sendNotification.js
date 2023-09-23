const { NotificationModel } = require('../models');

const sendNotification = async (req, to, from, message, task, projectId) => {
  //   if (to.equals(req.user._id)) {
  //     return;
  //   }

  const notification = await NotificationModel.create({
    to: to,
    from: from,
    message: message,
    task: task,
    status: false,
    project: projectId,
  });

  req.app.locals.io.emit(
    `notification_${to.toString()}`,
    JSON.stringify(notification)
  );
};

module.exports = sendNotification;
