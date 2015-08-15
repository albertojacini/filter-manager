var _ = require('lodash');
var {assert} = require('./utils');
var Filter = require('./Filter');

class RangeFilter extends Filter {

  constructor(options) {

    super(options);

    assert(_.isArray(options.initialRange), 'RangeFilter needs a valid initialRange array.');
    this.initialRange = options.initialRange;

    // Where the selected choice is stored
    this._range = _.clone(options.initialRange);

  }

  getParameters() {
    var params = {};
    params['min_' + this.queryParamKey] = this._range[0];
    params['max_' + this.queryParamKey] = this._range[1];
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

RangeFilter.constructorId = 'rangeFilterConstructor';

module.exports = RangeFilter;