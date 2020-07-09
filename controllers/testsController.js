const render = require('concerns/render');
const { convertBetweenUnits, getParts, getThrustersCells } = require('utilities/operations');
const { sortByTypes } = require('utilities/helpers');
const validators = require('./validators');

const test1 = (req, res) => {
  const { params, validationError } = validators.validate(req.body, validators.testsValidators.test1);
  if (validationError) return render.error(res, validationError);

  const result = convertBetweenUnits(params);
  return render.success(res, result);
};

const test2 = (req, res) => {
  const { params, validationError } = validators.validate(req.body, validators.testsValidators.test2);
  if (validationError) return render.error(res, validationError);

  const result = sortByTypes(params);
  return render.success(res, result);
};

const test3 = (req, res) => {
  const { params, validationError } = validators.validate(req.body, validators.testsValidators.test3);
  if (validationError) return render.error(res, validationError);

  const result = getParts(params);
  return render.success(res, result);
};

const test4 = (req, res) => {
  const { params, validationError } = validators.validate(req.body, validators.testsValidators.test4);
  if (validationError) return render.error(res, validationError);

  const result = getThrustersCells(params);
  return render.success(res, result);
};

module.exports = {
  test1, test2, test3, test4,
};
