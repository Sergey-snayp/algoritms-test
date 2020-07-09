const stageSort = require('utilities/operations').sortType;

module.exports = (params) => {
  let { data } = params;
  for (const [key, value] of Object.entries(params.condition)) data = stageSort[key]({ data, cond: value });
  return data;
};
