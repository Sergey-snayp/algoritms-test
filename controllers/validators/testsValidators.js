const Joi = require('@hapi/joi');
const { units } = require('utilities/constants');
const { sortType } = require('utilities/operations');

exports.test1 = Joi.object().keys({
  distance: Joi.object().keys({
    unit: Joi.string().valid(...Object.keys(units)).required(),
    value: Joi.number().required(),
  }),
  convert_to: Joi.string().valid(...Object.keys(units)).required(),
});

exports.test2 = Joi.object().keys({
  data: Joi.array().min(1).items(Joi.object().min(1).required()).required(),
  condition: Joi.object().pattern(
    Joi.string().valid(...Object.keys(sortType)).required(),
    Joi.array().min(1).required(),
  ).required(),
});

exports.test3 = Joi.object().keys({
  set: Joi.array().min(1).max(10).items(Joi.number().required())
    .required(),
});

exports.test4 = Joi.object().keys({
  corrections: Joi.array().min(1).items(Joi.number().valid(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12))
    .required(),
  cells: Joi.array().min(1).items(Joi.number().valid(2, 4, 6, 8, 10))
    .required(),
});
