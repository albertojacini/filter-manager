var _ = require('lodash');
var {assert, stringify} = require('./utils');
var Filter = require('./Filter');

const DEFAULT_STATE = null;

class SelectFilter extends Filter {

  constructor(options) {
    super(options);

    // Where the selected choice is stored
    this._selectedChoice = DEFAULT_STATE;

  }

  getParameters() {
    var param = {};
    try {
      param[this.queryParamKey] = this._selectedChoice.value;
    } catch (err) {}
    return param;
  }

  // Set can take a value or a key (hashed value).
  set(choiceKeyOrValue) {
    var res = _.find(this.choices, c => c.key === stringify(choiceKeyOrValue));
    assert(!_.isUndefined(res), 'You are trying to set the filter to a non available choice');
    this._selectedChoice = res;
  }

  /*
   * Since select filters have choices, get() returns the key of the selected choice (not a value).
   */
  get() {
    if (this.isSetToDefaultState()) {
      return null;
    } else {
      return this._selectedChoice.key;
    }
  }

  getSelectedChoice() {
    return this._selectedChoice;
  }

  resetToDefaultState() {
    this._selectedChoice = DEFAULT_STATE;
  }

  isSetToDefaultState() {
    return this._selectedChoice === DEFAULT_STATE;
  }

  getChoice(choiceKeyOrValue) {
    var choiceKey = stringify(choiceKeyOrValue);
    return _.find(this.choices, function(chr) {
      return chr.key === choiceKey;
    });
  }

  isChoiceSelected(choiceKeyOrValue) {
    var choiceKey = stringify(choiceKeyOrValue);
    if (this.isSetToDefaultState()) {
      return false;
    } else {
      var choice = this.getChoice(choiceKey);
      return choice.key === this._selectedChoice.key;
    }
  }

  updateFromQueryParamObject(obj) {
    var that = this;
    var choiceKey = null;
    Object.keys(obj).forEach(function(key) {
      if (key === that.queryParamKey) {
        choiceKey = obj[key];
      }
    });
    assert(!_.isNull(choiceKey), 'SelectFilter ' + this.id + ' couldn\'t find its params');
    this.set(choiceKey);
  }

}

SelectFilter.constructorId = 'selectFilterConstructor';

module.exports = SelectFilter;