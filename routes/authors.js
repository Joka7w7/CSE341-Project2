const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');

// GET all
router.get('/', authorsController.getAll);

// GET single
router.get('/:id', authorsController.getSingle);

// POST
router.post('/', authorsController.createAuthor);

// PUT
router.put('/:id', authorsController.updateAuthor);

// DELETE
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;