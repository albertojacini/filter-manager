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
    // Convert string to number
    range[0] = _.isString(range[0]) ? parseInt(range[0]) : range[0] ;
    range[1] = _.isString(range[1]) ? parseInt(range[1]) : range[1] ;
    // assert(_.isArray(range) && range.lenght === 2), 'Range filter only can be set with with an array of numbers or strings convertible to numbers');
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

  updateFromQueryParamObject(obj) {
    var that = this;
    var min = null, max = null;

    // Find 2 parameters like {min_length: 3, max_length: 7}
    Object.keys(obj).forEach(function (key) {
      if (key.substring(3) === ('_' + that.queryParamKey)) {
        if (_.startsWith(key, 'min_')) {
          min = key;
        } else if (_.startsWith(key, 'max_')) {
          max = key;
        }
      }
    });

    if (!_.isNull(min) && !_.isNull(max)) {
      this.set([obj[min], obj[max]]);
      return true;
    } else if (_.isNull(min) && _.isNull(max)) {
      return false;
    } else {
      console.warn('RangeFilter filter ' + this.id + 'can only find one param. It needs min and max.');
      return false;
    }

  }

}

RangeFilter.constructorId = 'rangeFilterConstructor';

module.exports = RangeFilter;
