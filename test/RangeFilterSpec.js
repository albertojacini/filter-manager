var {expect} = require('chai');
var RangeFilter = require('../src/RangeFilter');

const FILTER_ID = 'fooBar';
const FILTER_QUERY_PARAM_KEY = 'foo_bar';
const INITIAL_RANGE = [1, 10];

var options = {
  constructorId: RangeFilter.constructorId,
  id: FILTER_ID,
  queryParamKey: FILTER_QUERY_PARAM_KEY,
  initialRange: INITIAL_RANGE
};

describe('RangeFilter', function() {

  var filter;

  beforeEach(function() {
    filter = new RangeFilter(options);
  });

  describe('\'get\' method', function() {
    it('should return the initial range', function() {
      var ir = filter.get();
      expect(ir[0]).to.equal(INITIAL_RANGE[0]);
      expect(ir[1]).to.equal(INITIAL_RANGE[1]);
    });
  });

  describe('\'set\' method', function() {
    it('should set the value range', function() {
      filter.set([2, 9]);
      var r = filter.get();
      expect(r[0]).to.equal(2);
      expect(r[1]).to.equal(9);
    });
    it('should convert strings to numbers', function() {
      filter.set(['2', '9']);
      var r = filter.get();
      expect(r[0]).to.equal(2);
      expect(r[1]).to.equal(9);
    });
  });

  describe('\'isSetToDefaultValue\' method', function() {
    it('should return \'true\' if the filter is reset to initial value', function() {
      filter.set([2, 9]);
      expect(filter.isSetToDefaultState()).to.be.false;
      filter.set(INITIAL_RANGE);
      expect(filter.isSetToDefaultState()).to.be.true;
    });
  });

  describe('\'resetToDefaultState\' method', function() {
    it('should reset filter to initial state', function() {
      filter.set([2, 9]);
      expect(filter.isSetToDefaultState()).to.be.false;
      filter.resetToDefaultState();
      expect(filter.isSetToDefaultState()).to.be.true;
    });
  });

  describe('\'getParameters\' method', function() {
    it('should return a query param object wight min and max values', function() {
      filter.set([2, 9]);
      var param = filter.getParameters();
      expect(param).to.be.an('object');
      expect(param['min_' + FILTER_QUERY_PARAM_KEY]).to.equal(2);
      expect(param['max_' + FILTER_QUERY_PARAM_KEY]).to.equal(9);
    });
  });

  describe('\'updateFromQueryParamObject\' method', function() {

    it('should update from a queryParam object', function() {
      var queryObject = {min_foo_bar: 4, max_foo_bar: 6, boo: 'baba'};
      var wasUpdated = filter.updateFromQueryParamObject(queryObject);
      expect(filter.get()[0]).to.equal(4);
      expect(filter.get()[1]).to.equal(6);
      expect(wasUpdated).to.equal(true);
    });

    it('shouldn\'t modify filter if the queryParam is empty', function() {
      var queryObject = {};
      var wasUpdated = filter.updateFromQueryParamObject(queryObject);
      expect(filter.isSetToDefaultState()).to.equal(true);
      expect(wasUpdated).to.equal(false);
    });

  });

});
