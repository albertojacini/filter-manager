var _ = require('lodash');
var {assert} = require('./utils');
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

  set(choiceKey) {
    var res = _.find(this.choices, c => c.key === choiceKey);
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

  getChoice(choiceKey) {
    return _.find(this.choices, function(chr) {
      return chr.key === choiceKey;
    });
  }

  isChoiceSelected(choiceKey) {
    if (this.isSetToDefaultState()) {
      return false;
    } else {
      var choice = this.getChoice(choiceKey);
      return choice.key === this._selectedChoice.key;
    }
  }

  // Filters with choices must implement this method
  getChoiceKeyFromValue(value) {
    // Todo: Schifezza to make order filters fit in select filters. If value is number-like convert it to number.
    var numberValue = _.parseInt(value, 10);
    var v = _.isFinite(numberValue) ? numberValue : value ;
    return _.find(this.choices, function(c) {
      return c.value === v;
    }).key;
  }

}

SelectFilter.constructorId = 'selectFilterConstructor';

module.exports = SelectFilter;