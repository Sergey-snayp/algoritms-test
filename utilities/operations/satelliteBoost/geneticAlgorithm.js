const _ = require('lodash');
const { Child } = require('./child');

module.exports = (params) => {
  let loop = 0;
  const strongestDescendant = { delta_velocity: 0 };
  let children = [];
  for (let i = 0; i < 10; i++) {
    children.push(new Child(
      { corrections: _.cloneDeep(params.corrections), cells: _.cloneDeep(params.cells) },
    ));
  }
  children = _.sortBy(children, ['statistic_currentBoost']).reverse();
  while (loop !== 100) {
    if (strongestDescendant.delta_velocity < children[0].delta_velocity) {
      strongestDescendant.delta_velocity = children[0].delta_velocity;
      strongestDescendant.main_thruster = children[0].main_thruster;
      strongestDescendant.sec_thruster = children[0].sec_thruster;
    } else loop++;
    children = naturalSelection(children, params);
    children = _.sortBy(children, ['statistic_currentBoost']).reverse();
  }
  return strongestDescendant;
};

const naturalSelection = (children, params) => children.map((child) => {
  if (child.statistic_currentBoost < _.random(0, 100)) {
    child = new Child(
      { corrections: _.cloneDeep(params.corrections), cells: _.cloneDeep(params.cells) },
    );
  } else {
    const boosters = child.boosters.map((boost) => {
      if (boost.statistics < _.random(0, 100)) {
        return {
          main_thruster: undefined,
          sec_thruster: undefined,
        };
      }
      return {
        main_thruster: boost.main_thruster,
        sec_thruster: boost.sec_thruster,
      };
    });
    const mainThruster = [];
    const secThruster = [];
    boosters.forEach((boost) => {
      mainThruster.push(boost.main_thruster);
      secThruster.push(boost.sec_thruster);
    });
    child = child.createChild({ mainThruster, secThruster, cells: _.cloneDeep(params.cells) });
  }
  return child;
});
