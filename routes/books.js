const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const isAuthenticated = require('../middleware/auth');

// GET all
router.get('/', booksController.getAll);

// GET single
router.get('/:id', booksController.getSingle);

// POST
router.post('/', isAuthenticated, booksController.createBook);

// PUT
router.put('/:id', isAuthenticated, booksController.updateBook);

// DELETE
router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;
