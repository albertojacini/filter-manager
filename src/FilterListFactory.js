var _ = require('lodash');
var {assert} = require('./utils');

// Methods that must be implemented by every constructor.
var mandatoryFilterConstructorInterface = [
  'get',
  'set',
  'getParameters',
  'isSetToDefaultState',
  'resetToDefaultState',
  'updateFromQueryParamObject'
];

function createFilterList(constructors/*: array*/) {

  assert(_.isArray(constructors), 'constructors must be an array');
  // Every added filter must implement an interface

  for (var c of constructors) {
    for (var m of mandatoryFilterConstructorInterface) {
      assert(_.isFunction(c.prototype[m]), c.constructorId + ' constructor must implement the \'' + m + '\' method!');
    }
  }

  class FilterList {

    constructor(arrayOfOptions/*: array*/) {
      assert(_.isArray(arrayOfOptions), 'initial filter options bust be collected in an array');
      this.filterConstructors = _.indexBy(constructors, 'constructorId');
      this._allFilters = {};
      this.parameters = {};
      for (var f of arrayOfOptions) {
        this._addFilter(f);
      }
    }

    /**
     * @argument: filter -> Object with at least: {constructor: 'rangeFilterConstructor', key: 'my-key', extra: {}}
     */
    _addFilter(options) {
      var _constructor = this.filterConstructors[options.constructorId];


      assert(!_.isUndefined(_constructor), 'Unsupported filter type \"' + options.constructorId + '\". Supported types are: ' + Object.keys(this.filterConstructors) + '.');



      this._allFilters[options.id] = new _constructor(options);
    };

    getFilter(key) {
      if (!this._allFilters.hasOwnProperty(key)) {
        console.warn('The ' + key + ' filter is not available. Available filter keys are: ' + Object.keys(this._allFilters));
        return undefined;
      } else {
        return this._allFilters[key];
      }
    };

    getFilterByQueryParamKey(key) {
      var f = _.find(this._allFilters, function(filter) {
        return filter.queryParamKey === key;
      });
      if (_.isUndefined(f)) {
        console.warn('A filter with ' + key + ' as param key is not available. Available filter keys are: ' + Object.keys(this._allFilters));
        return undefined;
      } else {
        return f;
      }
    };

    // updateFiltersFromQueryObject takes a serialized object with query param keys (not js object keys).
    // Select and multiselect filters need to be modified using the key that is retrieved with getChoiceKeyFromValue.
    updateFiltersFromQueryObject(obj) {
      for (let f of this._allFilters) {
        f.updateFromQueryParamObject(obj);
      }
    };

    updateFilter(id, value) {
      this.getFilter(id).set(value);
    };

    resetFilter(id) {
      this.getFilter(id).resetToDefaultState();
    };

    getActiveFilters() {
      var activeFilters = [];
      _.forEach(this._allFilters, function (filter) {
        if (filter.isActive()) {
          activeFilters.push(filter);
        }
      });
      return activeFilters;
    };

    getParameters() {
      var params = {};
      _.forEach(this.getActiveFilters(), function (filter) {
        // Every filter type must implement its own getParameters method.
        var filterParams = filter.getParameters();
        _.assign(params, filterParams);
      });
      return params;
    };

    // Returns a list ok all the registered filters keys. Ex: ['height', 'resistance', 'flowerColor'...]
    getFilterIds() {
      return _.map(this._allFilters, function(f) {
        return _.clone(f.id);
      });
    };

    resetAllFilters() {
      _.forEach(this.getActiveFilters(), function (filter) {
        filter.resetToDefaultState();
      });
    };

  }

  return FilterList;

}

module.exports = createFilterList;