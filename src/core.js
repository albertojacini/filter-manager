/*
 * UIFilterStore
 */

var _ = require('lodash');
var SearchUIFilter = require('./search');
var SelectUIFilter = require('./select');
var MultiselectUIFilter = require('./multiselect');
var RangeUIFilter = require('./range');
/*var OrderingFilter = require('./ordering');*/

/**
 * Construct a list of filters object.
 */
function UIFilterList() {

  /*  var that = this;*/
  this._allFilters = {};
  this.parameters = {};
  this.filterConstructors = {
    range: RangeUIFilter,
    multiselect: MultiselectUIFilter,
    select: SelectUIFilter,
    /*    ordering: OrderingFilter,*/
    search: SearchUIFilter
  };

  // Functionality common to all filters
  function FilterMixin() {
    this.isFrozen = function () {
      return !!this.frozen;
    };
    this.freeze = function () {
      this.frozen = true;
    };
    this.unfreeze = function () {
      this.frozen = false;
    };
    this.isActive = function () {
      return !this.isSetToDefaultState() && !this.isFrozen();
    };
    this.printFilter = function () {
      return (this.label + ': ' + this.printValue());
    };
    this.getChoices = function () {
      return this.choices || [];
    };
  }

  // Extend every constructor with common filter functionality.
  _.forEach(this.filterConstructors, function (constructor) {
    FilterMixin.call(constructor.prototype);
  });


  /**
   * Add a filter providing a filter type among the available filterConstructors (range, select, multiselect etc.).
   * Every constructor (filter type) needs its own specific extra data in the 'extra' attribute.
   */
  this.addFilter = function (type/*: string*/, key/*: string*/, extra/*: object*/) {
    var _constru = this.filterConstructors[type];
    if (typeof _constru === 'undefined') {
      throw new Error('Unsupported filter type \"' + type + '\". Supported types are: ' + Object.keys(this.filterConstructors) + '.');
    }
    var newFilter = new _constru(extra);
    newFilter.key = key;
    newFilter.type = type;
    this._allFilters[key] = newFilter;
  };

  this.getFilter = function (key) {
    if (!this._allFilters.hasOwnProperty(key)) {
      console.warn('The ' + key + ' filter is not available. Available filter keys are: ' + Object.keys(this._allFilters));
      return undefined;
    } else {
      return this._allFilters[key];
    }
  };

  this.getFilterByParamKey = function(paramKey) {
    var f = _.find(this._allFilters, function(filter) {
      return filter.paramKey === paramKey;
    });
    if (_.isUndefined(f)) {
      console.warn('A filter with ' + paramKey + ' as param key is not available. Available filter keys are: ' + Object.keys(this._allFilters));
      return undefined;
    } else {
      return f;
    }
  };

  // updateFilters takes a serialized object with query param keys (not js object keys).
  // Select and multiselect filters need to be modified using the key that is retrieved with getFilterKeyFromValue.
  this.updateFiltersFromQueryObject = function (obj) {
    var that = this;
    var updatedFilters = [];
    _.forEach(obj, function(value, key) {
      var f = that.getFilterByParamKey(key);
      if (_.isUndefined(f)) {
        console.warn(key + ' is not a filter parameter');
      } else {
        if (f.hasChoices) {
          // Filters with choices must implement the getChoiceKeyFromValue() method.
          var k = f.getChoiceKeyFromValue(value);
          f.set(k);
        } else {
          f.set(value);
        }
        updatedFilters.push(f);
      }
    });
    return updatedFilters;
  };

  this.updateFilter = function (key, value) {
    this.getFilter(key).set(value);
  };

  this.resetFilter = function (key) {
    this.getFilter(key).resetToDefaultState();
  };

  this.getActiveFilters = function () {
    var activeFilters = [];
    _.forEach(this._allFilters, function (filter) {
      if (filter.isActive()) {
        activeFilters.push(filter);
      }
    });
    return activeFilters;
  };

  this.getParameters = function () {
    var params = {};
    _.forEach(this.getActiveFilters(), function (filter) {
      // Every filter type must implement its own getParameters method.
      var filterParams = filter.getParameters();
      _.assign(params, filterParams);
    });
    return params;
  };

  // Returns a list ok all the registered filters keys. Ex: ['height', 'resistance', 'flowerColor'...]
  this.getFilterKeys = function () {
    return _.map(this._allFilters, function(f) {
      return _.clone(f.key);
    });
  };

  this.resetAllFilters = function () {
    _.forEach(this.getActiveFilters(), function (filter) {
      filter.resetToDefaultState();
    });
  };

}
module.exports = UIFilterList;