const { ProjectModel } = require('../../../models');

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

module.exports = { addMember, removeMember };
