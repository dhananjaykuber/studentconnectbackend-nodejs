const { UserModel } = require('../models');

const getObjectId = async (userId) => {
  const user = await UserModel.findOne({ user_id: userId });
  return user?._id;
};

module.exports = getObjectId;
