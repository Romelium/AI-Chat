//From https://github.com/WW-Digital/stringify-with-floats
const beginFloat = '~begin~float~';
const endFloat = '~end~float~';

export const stringifyWithFloats = (config = {}) => (inputValue, inputReplacer, space) => {
  const inputReplacerIsFunction = (typeof inputReplacer === 'function');
  let isFirstIteration = true;
  const jsonReplacer = (key, val) => {
    if (isFirstIteration) {
      isFirstIteration = false;
      return inputReplacerIsFunction ? inputReplacer(key, val) : val;
    }
    let value;
    if (inputReplacerIsFunction) {
      value = inputReplacer(key, val);
    } else if (Array.isArray(inputReplacer)) {
      // remove the property if it is not included in the inputReplacer array
      value = (inputReplacer.indexOf(key) !== -1) ? val : undefined;
    } else {
      value = val;
    }
    const forceFloat = config[key] === 'float'
      && (value || value === 0)
      && typeof value === 'number'
      && !value.toString().toLowerCase().includes('e');
    return forceFloat ? `${beginFloat}${value}${endFloat}` : value;
  };
  const json = JSON.stringify(inputValue, jsonReplacer, space);
  const regexReplacer = (match, num) => {
    return (num.includes('.') || Number.isNaN(num)) ? num : `${num}.0`;
  };
  const re = new RegExp(`"${beginFloat}(.+?)${endFloat}"`, 'g');
  return json.replace(re, regexReplacer);
};