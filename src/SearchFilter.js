var _ = require('lodash');
var Filter = require('./Filter');

var DEFAULT_STATE = '';

class SearchFilter extends Filter {

  constructor(options) {
    super(options);
    this.label = options.label;

    // Where the selected choice is stored
    this._value = options.value || DEFAULT_STATE;

  }

  getParameters() {
    var param;
    if (this.isSetToDefaultState()) {
      return null;
    } else {
      param = {};
      param[this.queryParamKey] = this._value;
      return param;
    }
  };

  get() {
    return this._value;
  }

  set(value) {
    this._value = value;
  }

  resetToDefaultState() {
    this._value = DEFAULT_STATE;
  }

  isSetToDefaultState() {
    return this._value === DEFAULT_STATE;
  }

}

SearchFilter.constructorId = 'searchFilterConstructor';

module.exports = SearchFilter;