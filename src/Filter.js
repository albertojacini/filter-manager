var _ = require('lodash');
var {assert, checkChoiceHash} = require('./utils');

class Filter {

  constructor(options) {

    assert(_.isString(options.constructorId), 'A constructor must be provided');
    this.constructorId = options.constructorId;

    assert(_.isString(options.id), 'A id must be provided');
    this.id = options.id;

    assert(_.isString(options.queryParamKey), 'A queryParamKey must be provided');
    this.queryParamKey = options.queryParamKey;

    if (!_.isUndefined(options.choices)) {
      checkChoiceHash(options.choices);
      this.choices = options.choices;
    }

    this.label = options.label;

  }

  isActive() {
    return !this.isSetToDefaultState();
  };
  printFilter() {
    return (this.label + ': ' + this.printValue());
  };
  getChoices() {
    return this.choices || [];
  };

}

module.exports = Filter;