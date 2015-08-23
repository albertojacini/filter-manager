var _ = require('lodash');
module.exports = {
  assert: function(condition, message) {
    if (!condition) {
      message = message || 'Assertion failed';
      if (typeof Error !== 'undefined') {
        throw new Error(message);
      }
      throw message; // Fallback
    }
  },
  // This is important. It guarantees that you can use either keys and values (always with the getChoice function)
  // for choice lookups.
  checkChoiceHash: function(choiceGroup) {
    choiceGroup.forEach(function (choice, i) {
      if (!(choice.value === choice.key || choice.key === choice.value.toString())) {
        throw new Error('Hashing rules not respected: keys must be either equal or string version of values. \n' +
        'Key \'' + choice.key + '\' in \'' + i + '\' is neither.');
      }
    });
  },
  stringify: function(keyOrValue) {
    return _.isNumber(keyOrValue) ? keyOrValue.toString() : keyOrValue;
  }
};