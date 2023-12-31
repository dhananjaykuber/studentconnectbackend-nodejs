const { TaskModel } = require('../../../models');
const getObjectId = require('../../../utils/getObjectIdByUserId');
const sendNotification = require('../../../utils/sendNotification');

const createTask = async (req, res) => {
  const { stageId } = req.params;
  const {
    title,
    description,
    addedBy,
    assignedTo,
    dueDate,
    labels,
    projectId,
  } = req.body;
  try {
    const addedByObjectId = await getObjectId(addedBy);

    const assignedToObjectIds = await Promise.all(
      assignedTo.map(async (assigned) => {
        const objId = await getObjectId(assigned);
        return objId.toString();
      })
    );

    const task = await TaskModel.create({
      title,
      description,
      addedBy: addedByObjectId,
      assignedTo: assignedToObjectIds,
      dueDate,
      labels,
      stage: stageId,
    });
    const data = await task.save();

    assignedTo.map((userId) => {
      sendNotification(
        req,
        userId,
        req.user.user_name,
        `${req.user.user_name} created and add you in this task.`,
        data._id,
        projectId
      );
    });

    return res.status(200).json(data);
  } catch (error) {}
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { projectId } = req.body;

  const { assignedTo } = req.body;

  const assignedToObjectIds = await Promise.all(
    assignedTo.map(async (assigned) => {
      const objId = await getObjectId(assigned);
      return objId.toString();
    })
  );

  try {
    const data = await TaskModel.findByIdAndUpdate(
      taskId,
      { ...req.body, assignedTo: assignedToObjectIds },
      { new: true }
    );

    data.assignedTo.map((userId) => {
      sendNotification(
        req,
        userId,
        req.user.user_name,
        `${req.user.user_name} has made changes in this task`,
        taskId,
        projectId
      );
    });

    return res.status(200).json(data);
  } catch (error) {}
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const data = await TaskModel.findByIdAndDelete(taskId);

    return res.status(200).json(data);
  } catch (error) {}
};

const moveTask = async (req, res) => {
  const { destinationStage, projectId, title } = req.body;
  const { taskId } = req.params;

  try {
    const task = await TaskModel.findByIdAndUpdate(
      taskId,
      { $set: { stage: destinationStage } },
      { new: true }
    );

    task.assignedTo.map((userId) => {
      sendNotification(
        req,
        userId,
        req.user.user_name,
        `${req.user.user_name} moved task to ${title}`,
        taskId,
        projectId
      );
    });

    return res.status(200).json(task);
  } catch (error) {}
};

module.exports = { createTask, updateTask, deleteTask, moveTask };
