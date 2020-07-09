const _ = require('lodash');

class Child {
  constructor({
    corrections, secThruster, mainThruster, cells,
  }) {
    this.maxBoost = sum(corrections);
    this.delta_velocity = 0;
    this.corrections = corrections;
    this.main_thruster = secThruster || [];
    this.sec_thruster = mainThruster || [];
    this.statistic_currentBoost = 0;
    if (cells) this.createFirst(cells);
    this.boosters = this.getStatistics();
  }

  createFirst(cells) {
    let cellsSort = _.shuffle(cells);
    while (this.main_thruster.length !== this.corrections.length && this.sec_thruster.length !== this.corrections.length) {
      if (this.main_thruster.length !== this.corrections.length && this.corrections[this.main_thruster.length] - ((this.sec_thruster[this.main_thruster.length] / 2) || 0) >= cellsSort[0]) {
        this.main_thruster.push(cellsSort.shift());
      } else this.main_thruster.push(0);
      if (this.sec_thruster.length !== this.corrections.length && (this.corrections[this.sec_thruster.length] * 2) - ((this.main_thruster[this.sec_thruster.length] * 2) || 0) >= cellsSort[0]) {
        this.sec_thruster.push(cellsSort.shift());
      } else this.sec_thruster.push(0);
      cellsSort = _.shuffle(cellsSort);
    }
    this.delta_velocity = sum(this.main_thruster) + sum(this.sec_thruster) / 2;
  }

  createChild({
    mainThruster, secThruster, cells,
  }) {
    cells = cells.filter((cell) => {
      if (mainThruster.includes(cell) || secThruster.includes(cell)) return false;
      return true;
    });
    while (mainThruster.includes(undefined) || secThruster.includes(undefined)) {
      const indexesThrusters = _.shuffle(mainThruster.reduce((array, element, iteration) => {
        if (element === undefined) array.push(iteration);
        return array;
      }, []));
      indexesThrusters.forEach((index) => {
        if (cells.length !== 0 && this.corrections[index] - ((secThruster[index] / 2) || 0) >= cells[0]) mainThruster[index] = cells.shift();
        else {
          mainThruster[index] = 0;
        }
        if (cells.length !== 0 && this.corrections[index] - ((mainThruster[index] * 2) || 0) >= cells[0]) secThruster[index] = cells.shift();
        else {
          secThruster[index] = 0;
        }
      });
    }
    return new Child({ corrections: this.corrections, mainThruster, secThruster });
  }

  getStatistics() {
    this.statistic_currentBoost = ((this.delta_velocity * 100) / this.maxBoost);
    const boosters = [];
    for (let i = 0; i < this.corrections.length; i++) {
      boosters.push({
        main_thruster: this.main_thruster[i],
        sec_thruster: this.sec_thruster[i],
        sum: this.main_thruster[i] + (this.sec_thruster[i] / 2),
        statistics: ((this.main_thruster[i] + (this.sec_thruster[i] / 2)) * 100) / this.corrections[i],
      });
    }
    return boosters;
  }
}

const sum = (array) => {
  if (array.length > 0) return array.reduce((amount, el) => amount + el);
  return 0;
};

module.exports = {
  Child,
};
