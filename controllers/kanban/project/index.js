const { ProjectModel, StageModel, TaskModel } = require('../../../models');

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

const getProject = async (req, res) => {
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
            description: stage.description,
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
      return res
        .status(404)
        .json({ error: 'You are not a part of this project.' });
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

module.exports = { getProject, getProjects, createProject };
