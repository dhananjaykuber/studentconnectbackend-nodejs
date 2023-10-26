const { UserModel } = require('../models');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const user = await UserModel.findOne({ user_id: token });

    if (user) {
      req.user = user;
    } else {
      return res.status(400).json({ error: error.message });
    }

    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
