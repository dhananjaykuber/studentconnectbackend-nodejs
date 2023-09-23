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

module.exports = { getUsers };
