const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');

// GET all
router.get('/', booksController.getAll);

// GET single
router.get('/:id', booksController.getSingle);

// POST
router.post('/', booksController.createBook);

// PUT
router.put('/:id', booksController.updateBook);

// DELETE
router.delete('/:id', booksController.deleteBook);

module.exports = router;
