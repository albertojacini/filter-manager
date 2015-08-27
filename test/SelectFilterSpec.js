var {expect} = require('chai');
var SelectFilter = require('../src/SelectFilter');

const FILTER_ID = 'fooBar';
const FILTER_QUERY_PARAM_KEY = 'foo_bar';

var options = {
  constructorId: SelectFilter.constructorId,
  id: FILTER_ID,
  queryParamKey: FILTER_QUERY_PARAM_KEY,
  choices: [
    {key: '0', value: 0, label:  'Foo'},
    {key: '1', value: 1, label:  'Bar'},
    {key: '2', value: 2, label:  'Ter'}
  ]
};

describe('SelectFilter', function() {

  var filter;

  describe('throws an error if choices are not correctly hashed (key must be === or toString of value)', function() {
    it('should return \'null\'', function() {
      var opts = {
        constructorId: SelectFilter.constructorId,
        id: FILTER_ID,
        queryParamKey: FILTER_QUERY_PARAM_KEY,
        choices: [
          {key: 'one', value: 0, label:  'Foo'},
          {key: 'two', value: 1, label:  'Bar'}
        ]
      };
      expect(function() {new SelectFilter(opts);}).to.throw(Error);
    });
  });

  beforeEach(function() {
    filter = new SelectFilter(options);
  });

  describe('\'get\' method', function() {
    it('should return \'null\'', function() {
      expect(filter.get()).to.equal(null);
    });
  });

  describe('\'set\' method', function() {
    it('should set the value and return the choice\'s key, when set with a string', function() {
      filter.set('1');
      expect(filter.get()).to.equal('1');
    });

    it('should throw an error when fed an unavailable key', function() {
      expect(function() {filter.set('3')}).to.throw(Error); // Unavailable filter
    });

    it('should set the value and return the choice\'s key, when set with a number', function() {
      filter.set(1);
      expect(filter.get()).to.equal('1');
    });

    it('should throw an error when fed an unavailable key', function() {
      expect(function() {filter.set(3)}).to.throw(Error); // Unavailable filter
    });
  });

  describe('\'isSetToDefaultValue\' method', function() {
    it('should return true in the first place, false after set to something, and true againg after calling' +
      ' \'resetToDefaultState\'', function() {
      expect(filter.isSetToDefaultState()).to.be.true;
      filter.set(1);
      expect(filter.isSetToDefaultState()).to.be.false;
      filter.resetToDefaultState();
      expect(filter.isSetToDefaultState()).to.be.true;
    });
  });

  describe('\'getParameters\' method', function() {
    it('should return a query param object', function() {
      filter.set(1);
      var param = filter.getParameters();
      expect(param).to.be.an('object');
      expect(param[FILTER_QUERY_PARAM_KEY]).to.equal(1); // choice's 'value' param
    });
  });

  describe('\'updateFromQueryParamObject\' method', function() {
    it('should update from a queryParam object', function() {
      var queryObject = {'foo_bar': 1, 'boo_ban': 7};
      var wasUpdated = filter.updateFromQueryParamObject(queryObject);
      expect(filter.get()).to.equal('1');
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