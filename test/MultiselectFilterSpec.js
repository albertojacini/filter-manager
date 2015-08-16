var {expect} = require('chai');
var MultiselectFilter = require('../src/MultiselectFilter');

const FILTER_ID = 'fooBar';
const FILTER_QUERY_PARAM_KEY = 'foo_bar';

var options = {
  constructorId: MultiselectFilter.constructorId,
  id: FILTER_ID,
  queryParamKey: FILTER_QUERY_PARAM_KEY,
  choices: [
    {key: 'one', value: 0, label:  'Foo'},
    {key: 'two', value: 1, label:  'Bar'},
    {key: 'three', value: 2, label:  'Boo'}
  ]
};

describe('MultiselectFilter', function() {

  var filter;

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
      filter.set('one');
      filter.set('two');
      var keys = filter.get();
      expect(keys).to.be.an.array;
      expect(keys[0]).to.equal('one');
      expect(keys[1]).to.equal('two');
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
      filter.set('two');
      filter.set('three');
      var param = filter.getParameters();
      expect(param).to.be.an('object');
      expect(param[FILTER_QUERY_PARAM_KEY]).to.be.an.array;
      expect(param[FILTER_QUERY_PARAM_KEY][0]).to.equal(1);
      expect(param[FILTER_QUERY_PARAM_KEY][1]).to.equal(2);
    });
  });

});