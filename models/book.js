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
        notNull: {
          msg: 'Please provide a value for "Title"',
        },
        notEmpty: {
          msg: 'Please specify a book "Title"'
        }
      }
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "Title"',
        },
        notEmpty: {
          msg: 'Please specify a book "Title"'
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
