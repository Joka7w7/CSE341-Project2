const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// validation
const validateAuthor = (author) => {
  const requiredFields = ['name', 'nationality', 'birthYear', 'genre', 'notableWork', 'awards', 'alive'];
  return requiredFields.every(field => author[field]);
};

// GET ALL
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('authors').find();
    const authors = await result.toArray();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('authors').find({ _id: id });
    const authors = await result.toArray();

    if (!authors.length) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json(authors[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
const createAuthor = async (req, res) => {
  try {
    const author = req.body;

    if (!validateAuthor(author)) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const response = await mongodb.getDatabase().db().collection('authors').insertOne(author);

    res.status(201).json({
      message: 'Author created',
      id: response.insertedId
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateAuthor = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const author = req.body;

    if (!validateAuthor(author)) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const response = await mongodb.getDatabase().db().collection('authors')
      .replaceOne({ _id: id }, author);

    if (response.modifiedCount === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteAuthor = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    const response = await mongodb.getDatabase().db().collection('authors')
      .deleteOne({ _id: id });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createAuthor,
  updateAuthor,
  deleteAuthor
};