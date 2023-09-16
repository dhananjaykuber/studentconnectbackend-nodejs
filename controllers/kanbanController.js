const { UserModel, ProjectModel, StageModel, TaskModel } = require('../models');

const getUsers = async (req, res) => {
  const { user } = req.query;

  try {
    const data = await UserModel.find({
      $or: [
        { email: { $regex: user, $options: 'i' } },
        { user_name: { $regex: user, $options: 'i' } },
      ],
    });

    return res.status(200).json(data);
  } catch (error) {}
};

const getProjects = async (req, res) => {
  try {
    const data = await ProjectModel.find({
      members: {
        $in: [req.user],
      },
    }).populate('lead', 'user_name profile_image');

    return res.status(200).json(data);
  } catch (error) {
    return res.status(401).json({ error: 'Projects not found' });
  }
};

const getProjectById = async (req, res) => {
  const { projectId } = req.params;

  try {
    const exists = await ProjectModel.find({
      _id: projectId,
      members: { $in: req.user },
    });

    if (exists.length >= 1) {
      try {
        // Find the project by its ID and populate the 'lead' and 'members' fields with user data
        const project = await ProjectModel.findById(projectId)
          .populate('lead', 'user_name profile_image')
          .populate('members', 'user_name profile_image')
          .exec();

        if (!project) {
          return null; // Project not found
        }

        // Find all stages associated with the project
        const stages = await StageModel.find({ _id: { $in: project.stages } });

        // Initialize an array to store the project's stages with their associated tasks
        const stagesWithTasks = [];

        // Iterate over each stage and populate it with its tasks
        for (const stage of stages) {
          const tasks = await TaskModel.find({ stage: stage._id })
            .populate('assignedTo', 'user_name profile_image')
            .populate('addedBy', 'user_name profile_image') // Populate addedBy with user data
            .populate('comments.user', 'user_name profile_image')
            .exec();

          const formattedTasks = tasks.map((task) => ({
            _id: task._id,
            title: task.title,
            description: task.description,
            assignedTo: task.assignedTo, // User data for assignedTo
            addedBy: task.addedBy,
            labels: task.labels,
            comments: task.comments, // Comments with user data
            dueDate: task.dueDate,
            // Add more task properties as needed
          }));

          stagesWithTasks.push({
            _id: stage._id,
            title: stage.name,
            tasks: formattedTasks,
          });
        }

        // Create the projectInfo object with the retrieved data
        const projectInfo = {
          project: {
            _id: project._id,
            name: project.name,
            description: project.description,
            lead: project.lead,
            members: project.members,
          },
          stages: stagesWithTasks,
        };

        return res.status(200).json(projectInfo);
      } catch (error) {
        console.error(error);
        throw error;
      }
    } else {
      // error
    }
  } catch (error) {}
};

const createProject = async (req, res) => {
  const { name, description, members, lead } = req.body;

  try {
    const data = await ProjectModel.create({
      name,
      description,
      members,
      lead,
    });

    return res.status(200).json(data);
  } catch (error) {}
};

const addMember = async (req, res) => {
  const { projectId } = req.params;
  const { memberId } = req.body;

  try {
    const exists = await ProjectModel.find({
      _id: projectId,
      members: { $in: memberId },
    });

    if (exists.length >= 1) {
      res.status(409).json({ error: 'User is already a member of project' });
    } else {
      const data = await ProjectModel.findByIdAndUpdate(
        projectId,
        {
          $push: { members: memberId },
        },
        { new: true }
      );

      res.status(200).json(data);
    }
  } catch (error) {}
};

const removeMember = async (req, res) => {
  const { projectId } = req.params;
  const { memberId } = req.body;

  try {
    const exists = await ProjectModel.find({
      _id: projectId,
      members: { $in: memberId },
    });

    if (exists.length >= 1) {
      const data = await ProjectModel.findByIdAndUpdate(
        projectId,
        {
          $pull: { members: memberId },
        },
        { new: true }
      );

      return res.status(200).json(data);
    } else {
      //  error
    }
  } catch (error) {}
};

const createStage = async (req, res) => {
  const { projectId } = req.params;
  const { name, order, description } = req.body;

  try {
    const stage = await StageModel.create({ name, order, description });
    const data = await stage.save();

    const stageId = data._id;

    const project = await ProjectModel.findByIdAndUpdate(projectId, {
      $push: { stages: stageId },
    });
    project.save();

    return res.status(200).json(data);
  } catch (error) {}
};

const createTask = async (req, res) => {
  const { stageId } = req.params;
  const { title, description, addedBy, assignedTo, dueDate, labels } = req.body;
  try {
    const task = await TaskModel.create({
      title,
      description,
      addedBy,
      assignedTo,
      dueDate,
      labels,
      stage: stageId,
    });
    const data = await task.save();

    return res.status(200).json(data);
  } catch (error) {}
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const data = await TaskModel.findByIdAndUpdate(
      taskId,
      { ...req.body },
      { new: true }
    );

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
  const { destinationStage } = req.body;
  const { taskId } = req.params;

  console.log(destinationStage, taskId);

  try {
    const task = await TaskModel.findByIdAndUpdate(
      taskId,
      { $set: { stage: destinationStage } },
      { new: true }
    );

    return res.status(200).json(task);
  } catch (error) {}
};

const addComment = async (req, res) => {
  const { taskId } = req.params;
  const { message, commented_at } = req.body;

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

module.exports = {
  getUsers,
  createProject,
  getProjects,
  getProjectById,
  addMember,
  removeMember,
  createStage,
  createTask,
  deleteTask,
  moveTask,
  updateTask,
  addComment,
  deleteComment,
};
