var express = require('express');
var router = express.Router();
const { Book } = require('../models');

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}

/* GET Book listing. */
router.get('/', asyncHandler( async (req, res) => {
  const books = await Book.findAll();
  res.render('books', { books, title: "Books" });
}));

router.get('/new', asyncHandler(async (req, res) => {
  res.render('books/new', { book: {}, title: 'New Book' });
}));

router.post('/', asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.redirect('/books');
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render('books/show' , { book, title: 'Update Book'} );
}));

router.post('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect('/books');
}));

router.post('/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/books');
}));


module.exports = router;


// get /books - Shows the full list of books.
// get /books/new - Shows the create new book form.
// post /books/new - Posts a new book to the database.
// get /books/:id - Shows book detail form. +++++
// post /books/:id - Updates book info in the database.
// post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting
