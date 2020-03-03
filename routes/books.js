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
router.get('/', function(req, res, next) {

  res.render('books', { title: "Books" });
});

module.exports = router;
