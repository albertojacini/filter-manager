var _ = require('lodash');
var {assert, stringify} = require('./utils');
var Filter = require('./Filter');

// DEFAULT_STATE = [] Todo: use an immutable object if you want to use this variable as reference.

class MultiselectFilter extends Filter {

  constructor(options) {
    super(options);

    // Where the selected choices are stored
    this._selectedChoices = [];

  }

  getParameters() {
    var param = {};
    var values =  this._selectedChoices.map(c => c.value);
    param[this.queryParamKey] = values;
    return param;
  }

  set(choiceKeyOrValue) {
    var ck = stringify(choiceKeyOrValue);
    if (_.isArray(ck)) {
      _.forEach(ck, k => this._selectedChoices.push(this.getChoice(k)));
    } else {
      if (this.isChoiceSelected(ck)) {
        this._selectedChoices = this._selectedChoices.filter(c => c.key !== ck);
      } else {
        this._selectedChoices.push(this.getChoice(ck));
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
    var ck = stringify(choiceKey);
    return _.find(this.choices, function(chr) {
      return chr.key === ck;
    });
  }

  isChoiceSelected(choiceKey) {
    var ck = stringify(choiceKey);
    if (this.isSetToDefaultState()) {
      return false;
    } else {
      return !!_.find(this._selectedChoices, c => c.key === ck, 'key');
    }
  }

  updateFromQueryParamObject(obj) {
    var that = this;
    var choiceKeys = null;
    Object.keys(obj).forEach(function(key) {
      if (key === that.queryParamKey) {
        choiceKeys = obj[key];
      }
    });
    if (!_.isNull(choiceKeys)) {
      this.set(choiceKeys);
      return true;
    } else {
      return false;
    }
  }

}

MultiselectFilter.constructorId = 'multiselectFilterConstructor';

module.exports = MultiselectFilter;