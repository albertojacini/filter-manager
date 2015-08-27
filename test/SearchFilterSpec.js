var {expect} = require('chai');
var SearchFilter = require('../src/SearchFilter');

const FILTER_ID = 'fooBar';
const FILTER_QUERY_PARAM_KEY = 'foo_bar';

var options = {
  constructorId: SearchFilter.constructorId,
  id: FILTER_ID,
  queryParamKey: FILTER_QUERY_PARAM_KEY
};

describe('SearchFilter', function() {

  var filter;

  beforeEach(function() {
    filter = new SearchFilter(options);
  });

  describe('\'get\' method', function() {
    it('should return an empty string', function() {
      expect(filter.get()).to.equal('');
    });
  });

  describe('\'set\' method', function() {
    it('should set the value range', function() {
      filter.set('boo');
      expect(filter.get()).to.equal('boo');
    });
  });

  describe('\'isSetToDefaultValue\' method', function() {
    it('should return \'true\' if the filter is reset to initial value', function() {
      filter.set('boo');
      expect(filter.isSetToDefaultState()).to.be.false;
      filter.set('');
      expect(filter.isSetToDefaultState()).to.be.true;
    });
  });

  describe('\'resetToDefaultState\' method', function() {
    it('should reset filter to initial state', function() {
      filter.set('boo');
      expect(filter.isSetToDefaultState()).to.be.false;
      filter.resetToDefaultState();
      expect(filter.isSetToDefaultState()).to.be.true;
    });
  });

  describe('\'getParameters\' method', function() {
    it('should return a query param object', function() {
      filter.set('boo');
      var param = filter.getParameters();
      expect(param).to.be.an('object');
      expect(param[FILTER_QUERY_PARAM_KEY]).to.equal('boo');
    });
  });

  describe('\'updateFromQueryParamObject\' method', function() {

    it('should update from a queryParam object', function() {
      var queryObject = {'foo_bar': 'Bono Vox', 'boo_ban': 7};
      var wasUpdated = filter.updateFromQueryParamObject(queryObject);
      expect(filter.get()).to.equal('Bono Vox');
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