'use strict';

var _ = require('lodash');

var DEFAULT_STATE = '';

class SearchFilterConstructor {

  constructor(options) {
    this.hasChoices = false;
    if (!options.paramKey) {
      throw Error('a paramKey must be provided');
    }
    this.paramKey = options.paramKey;
    this.label = options.label;
    this.frozen = options.frozen;

    // Where the selected choice is stored
    this._value = options.value || DEFAULT_STATE;

  }

  getParameters() {
    var param;
    if (this.isSetToDefaultState()) {
      return null;
    } else {
      param = {};
      param[this.paramKey] = this._value;
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

module.exports = SearchFilterConstructor;