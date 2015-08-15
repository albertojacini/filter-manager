var _ = require('lodash');
var Filter = require('./Filter');

// DEFAULT_STATE = [] Todo: use an immutable object if you want to use this variable as reference.

class MultiselectFilter extends Filter {

  constructor(options) {
    super();
    this.hasChoices = true;
    this.paramKey = options.paramKey;
    this.label = options.label;
    this.choices = options.choices; // Should it be cloned?

    // _selectedChoices is an array of choices
    this._selectedChoices = [];

  }

  getParameters() {
    var param = {};
    var values =  this._selectedChoices.map(c => c.value);
    param[this.paramKey] = values;
    return param;
  }

  set(choiceKey) {
    if (_.isArray(choiceKey)) {
      _.forEach(choiceKey, k => this._selectedChoices.push(this.getChoice(k)));
    } else {
      if (this.isChoiceSelected(choiceKey)) {
        this._selectedChoices = this._selectedChoices.filter(c => c.key !== choiceKey);
      } else {
        this._selectedChoices.push(this.getChoice(choiceKey));
      }
    }
  }

  /*
   * Since select filters have choices, get() returns the array of keys of the selected choices.
   */
  get() {
    if (this.isSetToDefaultState()) {
      return [];
    } else {
      return this._selectedChoices.map(c => c.key);
    }
  }

  getSelectedChoices() {
    return this._selectedChoices;
  }

  resetToDefaultState() {
    this._selectedChoices = [];
  }

  isSetToDefaultState() {
    return this._selectedChoices.length === 0;
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
      return !!_.find(this._selectedChoices, c => c.key === choiceKey, 'key');
    }
  }

  _getChoiceByValue(value) {
    return _.find(this.choices, c => c.value === value);
  }

  // Filters with choices must implement this method
  getChoiceKeyFromValue(valuesArray) {
    var arrayOfValues = _.map(valuesArray, v => parseInt(v, 10));
    var arrayOfKeys = _.map(arrayOfValues, v => this._getChoiceByValue(v).key);
    return arrayOfKeys;
  }

}

MultiselectFilter.constructorId = 'multiselectFilterConstructor';

module.exports = MultiselectFilter;