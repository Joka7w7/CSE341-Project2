const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');
const isAuthenticated = require('../middleware/auth');

// GET all
router.get('/', authorsController.getAll);

// GET single
router.get('/:id', authorsController.getSingle);

// POST
router.post('/', isAuthenticated, authorsController.createAuthor);

// PUT
router.put('/:id', isAuthenticated, authorsController.updateAuthor);

// DELETE
router.delete('/:id', isAuthenticated, authorsController.deleteAuthor);

module.exports = router;