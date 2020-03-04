'use strict';
const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please specify a "Title" for the book'
        }
      }
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please specify the name of the "Author"'
        }
      }
    },
    genre: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.INTEGER
    }
  }, { sequelize });

  return Book;
};
