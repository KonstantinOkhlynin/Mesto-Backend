/* eslint-disable linebreak-style */
const validator = require('validator');
const { BadRequestError } = require('./BadRequestError');

module.exports = (link) => {
  if (validator.isURL(link)) {
    return link;
  }
  throw new BadRequestError('неверный формат Url');
};
