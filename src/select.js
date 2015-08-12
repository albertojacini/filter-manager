var _ = require('lodash');

const DEFAULT_STATE = null;

class SelectFilter {

  constructor(options) {
    this.hasChoices = true;
    this.paramKey = options.paramKey;
    this.label = options.label;
    this.choices = options.choices; // Should it be cloned?

    // Where the selected choice is stored
    this._selectedChoice = DEFAULT_STATE;

  }

  getParameters() {
    var param = {};
    try {
      param[this.paramKey] = this._selectedChoice.value;
    } catch (err) {}
    return param;
  }

  set(choiceKey) {
    choiceKey = parseInt(choiceKey, 10);
    this._selectedChoice = _.find(this.choices, c => c.key === choiceKey);
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

module.exports = SelectFilter;