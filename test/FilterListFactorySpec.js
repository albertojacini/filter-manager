var {expect} = require('chai');

var Filter = require('../src/Filter');
var filterListFactory = require('../src/FilterListFactory');

const DUMMY_FILTER_ID = 'fooBar';
const DUMMY_FILTER_QUERY_PARAM_KEY = 'foo_bar';
const DUMMY_CONSTRUCTOR_ID = 'fooBarFilterConstructor';

class RangeFilter extends Filter {
  constructor(options) {
    super(options);
  }
  get() {}
  set() {}
  getParameters() {}
  isSetToDefaultState() {}
  resetToDefaultState() {}
  updateFromQueryParamObject() {}
}
RangeFilter.constructorId = DUMMY_CONSTRUCTOR_ID;

var fooBarFilterOptions = {
  constructorId: DUMMY_CONSTRUCTOR_ID,
  id: DUMMY_FILTER_ID,
  queryParamKey: DUMMY_FILTER_QUERY_PARAM_KEY,
  extra: {}
};

describe('filterListFactory', function() {

  var FilterList;

  beforeEach(function() {
    FilterList = filterListFactory([]);
  });

  it('return a FilterList function', function() {
    expect(FilterList).to.be.a('function');
  });

});

describe('FilterList', function() {

  var FilterList, filterList;

  var constructors = [RangeFilter];

  beforeEach(function() {
    FilterList = filterListFactory(constructors);
    var filters = [fooBarFilterOptions];
    filterList = new FilterList(filters);
  });

  describe('\'getFilter\' method', function() {
    it('should return a filter', function() {
      var filter = filterList.getFilter(DUMMY_FILTER_ID);
      expect(filter).to.be.an('object');
    });
  });

  describe('\'getFilterByQueryParamKey\' method', function() {
    it('should return a filter', function() {
      var filter = filterList.getFilterByQueryParamKey(DUMMY_FILTER_QUERY_PARAM_KEY);
      expect(filter).to.be.an('object');
      expect(filter.id).to.equal('fooBar');
    });
  });

  describe('\'getFilterIds\' method', function() {
    it('should return a list of all the registered filters ids', function() {
      var list = filterList.getFilterIds();
      expect(list).to.be.an('array');
      expect(list[0]).to.equal(DUMMY_FILTER_ID);
    });
  });

});