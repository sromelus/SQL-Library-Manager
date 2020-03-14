var express = require('express');
var router = express.Router();
const { Book } = require('../models');

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      // console.error(error);
      res.status(500).send(error);
    }
  }
}

/* GET Book listing. */
router.get('/', asyncHandler( async (req, res) => {
  const books = await Book.findAll({
    order:[['createdAt', 'DESC']]
  });
  res.render('books', { books, title: "Books" });
}));

router.get('/new', asyncHandler(async (req, res) => {
  res.render('books/new-book', { book: {}, title: 'New Book' });
}));

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


router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  // throw new Error()
  if (book) {
    res.render('books/update-book' , { book, title: 'Update Book'} );
  } else {
    res.render('error', { title: 'Page Not Found', servError: 'Server Error' });
  }
}));

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

router.post('/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/books');
}));


module.exports = router;
