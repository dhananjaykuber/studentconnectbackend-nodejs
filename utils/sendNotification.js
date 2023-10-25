const { NotificationModel } = require('../models');
const getObjectId = require('./getObjectIdByUserId');

const sendNotification = async (req, to, from, message, task, projectId) => {
  //   if (to.equals(req.user.user_id)) {
  //     return;
  //   }

  const toObjectId = await getObjectId(to);

  const notification = await NotificationModel.create({
    to: toObjectId,
    from: from,
    message: message,
    task: task,
    status: false,
    project: projectId,
  });

  req.app.locals.io.emit(`notification_${to}`, JSON.stringify(notification));
};

module.exports = sendNotification;
