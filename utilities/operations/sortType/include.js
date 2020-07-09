module.exports = ({ data, cond }) => data.filter((countData) => filterSettings(countData, cond));

const filterSettings = (data, cond) => {
  for (const condCount of cond) {
    const [condData] = Object.entries(condCount);
    if (data[condData[0]] === undefined || data[condData[0]] !== condData[1]) return false;
  }
  return true;
};
