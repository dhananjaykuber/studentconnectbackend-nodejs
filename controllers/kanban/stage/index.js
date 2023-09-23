const { StageModel, ProjectModel } = require('../../../models');

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

const updateStage = async (req, res) => {
  const { stageId } = req.params;
  const { title, description } = req.body;

  try {
    const data = await StageModel.findByIdAndUpdate(
      stageId,
      { $set: { name: title, description: description } },
      { new: true }
    );

    return res.status(200).json(data);
  } catch (error) {}
};

module.exports = { createStage, updateStage };
