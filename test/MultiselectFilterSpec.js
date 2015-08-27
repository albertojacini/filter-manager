var {expect} = require('chai');
var MultiselectFilter = require('../src/MultiselectFilter');

const FILTER_ID = 'fooBar';
const FILTER_QUERY_PARAM_KEY = 'foo_bar';

var options = {
  constructorId: MultiselectFilter.constructorId,
  id: FILTER_ID,
  queryParamKey: FILTER_QUERY_PARAM_KEY,
  choices: [
    {key: '0', value: 0, label:  'Foo'},
    {key: '1', value: 1, label:  'Bar'},
    {key: '2', value: 2, label:  'Boo'}
  ]
};

describe('MultiselectFilter', function() {

  var filter;

  describe('throws an error if choices are not correctly hashed (key must be === or toString of value)', function() {
    it('should return \'null\'', function() {
      var opts = {
        constructorId: MultiselectFilter.constructorId,
        id: FILTER_ID,
        queryParamKey: FILTER_QUERY_PARAM_KEY,
        choices: [
          {key: 'one', value: 0, label:  'Foo'},
          {key: 'two', value: 1, label:  'Bar'}
        ]
      };
      expect(function() {new MultiselectFilter(opts);}).to.throw(Error);
    });
  });

  beforeEach(function() {
    filter = new MultiselectFilter(options);
  });

  describe('\'get\' method', function() {
    it('should return \'null\'', function() {
      expect(filter.get()).to.be.an.array;
      expect(filter.get()).to.be.empty;
    });
  });

  describe('\'set\' method', function() {
    it('should set the value and return the choice\'s key, when set to that key', function() {
      filter.set('1');
      filter.set(2);
      var keys = filter.get();
      expect(keys).to.be.an.array;
      expect(keys[0]).to.equal('1');
      expect(keys[1]).to.equal('2');
    });

    it('should throw an error when fed an unavailable key', function() {
      expect(function() {filter.set('a')}).to.throw; // Unavailable filter
    });
  });

  describe('\'isSetToDefaultValue\' method', function() {
    it('should return true in the first place, false after set to something, and true againg after calling' +
      ' \'resetToDefaultState\'', function() {
      expect(filter.isSetToDefaultState()).to.be.true;
      filter.set('one');
      expect(filter.isSetToDefaultState()).to.be.false;
      filter.resetToDefaultState();
      expect(filter.isSetToDefaultState()).to.be.true;
    });
  });

  describe('\'getParameters\' method', function() {
    it('should return a query param object', function() {
      filter.set('1');
      filter.set(2);
      var param = filter.getParameters();
      expect(param).to.be.an('object');
      expect(param[FILTER_QUERY_PARAM_KEY]).to.be.an.array;
      expect(param[FILTER_QUERY_PARAM_KEY][0]).to.equal(1);
      expect(param[FILTER_QUERY_PARAM_KEY][1]).to.equal(2);
    });
  });

  describe('\'updateFromQueryParamObject\' method', function() {
    it('should update from a queryParam object', function() {
      var queryObject = {'foo_bar': [1, '2'], 'boo_ban': 7};
      var wasUpdated = filter.updateFromQueryParamObject(queryObject);
      expect(filter.get()[0]).to.equal('1');
      expect(filter.get()[1]).to.equal('2');
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