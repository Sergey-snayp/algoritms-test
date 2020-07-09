const permutation = (array) => {
  if (array.length > 1) {
    const firstElement = array[0];
    const returnedArray = permutation(array.slice(1));
    const permutedArray = [];
    let temporaryArray = [];
    const elementLength = returnedArray[0].length;
    for (let i = 0; i < returnedArray.length; i++) {
      for (let j = 0; j <= elementLength; j++) {
        temporaryArray = returnedArray[i].slice(0);
        temporaryArray.splice(j, 0, firstElement);
        permutedArray.push(temporaryArray);
      }
    }
    return permutedArray;
  }
  return [array];
};

const sum = (array) => array.reduce((amount, el) => amount + el);

module.exports = (params) => {
  const allCombinations = permutation(params.set);
  const parts = [];
  allCombinations.forEach((element) => {
    for (let j = 1; j < element.length; j++) {
      const firstElement = element.slice(0, j);
      const secondElement = element.slice(j);
      if (sum(firstElement) === sum(secondElement)) { parts[0] = firstElement; parts[1] = secondElement; return parts; }
      if (parts.length === 0 || Math.abs(sum(firstElement) - sum(secondElement)) < Math.abs(sum(parts[0]) - sum(parts[1]))) {
        parts[0] = firstElement; parts[1] = secondElement;
      }
    }
  });
  return { set_1: parts[0], set_2: parts[1] };
};
