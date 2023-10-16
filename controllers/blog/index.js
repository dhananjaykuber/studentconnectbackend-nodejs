const { BlogModel } = require('../../models');

const addBlog = async (req, res) => {
  const { title, description, banner, categories } = req.body;

  try {
    const blog = await BlogModel.create({
      title,
      description,
      banner,
      categories,
      // author: req.user._id,
    });

    const data = await blog.save();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Cannot create blog, try again.' });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find();

    res.status(200).json(blogs);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error occured while getting blogs, try again.' });
  }
};

const getBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await BlogModel.findById(id);

    if (blog) {
      return res.status(200).json(blog);
    }

    res.status(404).json({ error: 'Blog not found.' });
  } catch (error) {
    res.status(500).json({ error: 'Blog not found' });
  }
};

const editBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await BlogModel.findByIdAndUpdate(id, { ...req.body });

    if (blog) {
      return res.status(200).json(blog);
    }

    res.status(404).json({ error: 'Blog not found.' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error occured while updating blog, try again.' });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await BlogModel.findByIdAndDelete(id);

    if (blog) {
      return res.status(200).json(blog);
    }

    res.status(404).json({ error: 'Blog not found.' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error occured while deleting blog, try again.' });
  }
};

const getByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const blogs = await BlogModel.find({ categories: category });

    if (blogs) {
      return res.status(200).json(blogs);
    }

    res.status(404).json({ error: 'Blogs with category not found.' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error occured while getting blogs, try again.' });
  }
};

module.exports = {
  addBlog,
  getBlog,
  getBlogs,
  editBlog,
  deleteBlog,
  getByCategory,
};
