var _ = require('lodash');

class RangeFilter {

  constructor(options) {
    this.hasChoices = false;
    this.paramKey = options.paramKey;
    this.label = options.label;
    this.initialRange = options.initialRange;

    // Where the selected choice is stored
    this._range = _.clone(options.initialRange);
  }

  getParameters() {
    var params = {};
    params['min_' + this.paramKey] = this._range[0];
    params['max_' + this.paramKey] = this._range[1];
    return params;
  }

  set(range /*: array */) {
    this._range = range;
  }

  /*
   * Since select filters have choices, get() returns the key of the selected choice (not a value).
   */
  get() {
    return this._range;
  }

  resetToDefaultState() {
    this._range = this.initialRange;
  }

  isSetToDefaultState() {
    return (this._range[0] === this.initialRange[0] && this._range[1] === this.initialRange[1]);
  }

}

module.exports = RangeFilter;