module.exports = ({ data, cond }) => data.sort((a, b) => (a[cond[0]] > b[cond[0]] ? 1 : -1));
