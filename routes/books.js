const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// POST /: Create a new book
router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// GET /: Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET /:id: Get a single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.send(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// PUT /:id: Update a book by ID
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.send(book);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// DELETE /:id: Delete a book by ID
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.send({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
