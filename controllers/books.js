const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// VALIDATION FUNCTION
const validateBook = (book) => {
  const requiredFields = [
    'title', 'author', 'genre',
    'publishedYear', 'pages',
    'language', 'publisher', 'isbn', 'available'
  ];

  return requiredFields.every(field => book[field]);
};

// GET ALL
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('books').find();
    const books = await result.toArray();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('books').find({ _id: id });
    const books = await result.toArray();

    if (!books.length) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(books[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
const createBook = async (req, res) => {
  try {
    const book = req.body;

    if (!validateBook(book)) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const response = await mongodb.getDatabase().db().collection('books').insertOne(book);

    res.status(201).json({
      message: 'Book created',
      id: response.insertedId
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateBook = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const book = req.body;

    if (!validateBook(book)) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const response = await mongodb.getDatabase().db().collection('books')
      .replaceOne({ _id: id }, book);

    if (response.modifiedCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteBook = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    const response = await mongodb.getDatabase().db().collection('books')
      .deleteOne({ _id: id });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook
};