const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const { Book } = require('../models');

// handle try catch for each route
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      // log error to the console and call the error handler
      console.error(error);
      //createError() has a default 500 http error
      next(createError());
    }
  }
}

// List all books
router.get('/', asyncHandler( async (req, res) => {
  const books = await Book.findAll({
    order:[['createdAt', 'DESC']]
  });
  res.render('books', { books, title: "Books" });
}));

//get the form for a new book
router.get('/new', asyncHandler(async (req, res) => {
  res.render('books/new-book', { book: {}, title: 'New Book' });
}));

// add a new book to the database
router.post('/new', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect('/books');
  } catch (err) {
    if (err.name = "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render('books/new-book', { book, errors: err.errors, title: 'New Book' });
    } else {
      throw err;
    }
  }
}));

//show a specific book from the database
router.get('/:id', asyncHandler(async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    res.render('books/update-book' , { book, title: 'Update Book'} );
  } else {
    next(createError(404));
  }
}));

//edit a book
router.post('/:id', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    await book.update(req.body);
    res.redirect('/books');
  } catch (err) {
    if (err.name = "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render('books/update-book', { book, errors: err.errors, title: 'Update Book' });
    } else {
      throw err;
    }
  }
}));

// delete a book
router.post('/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/books');
}));


module.exports = router;
