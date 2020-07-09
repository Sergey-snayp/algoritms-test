const { units } = require('utilities/constants');

module.exports = (params) => ({
  unit: params.convert_to,
  value: (Math.ceil(((units[params.distance.unit] * params.distance.value) / units[params.convert_to]) * 100) / 100),
});
