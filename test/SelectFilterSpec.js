var {expect} = require('chai');
var SelectFilter = require('../src/SelectFilter');

const FILTER_ID = 'fooBar';
const FILTER_QUERY_PARAM_KEY = 'foo_bar';

var options = {
  constructorId: SelectFilter.constructorId,
  id: FILTER_ID,
  queryParamKey: FILTER_QUERY_PARAM_KEY,
  choices: [
    {key: 'one', value: 0, label:  'Foo'},
    {key: 'two', value: 1, label:  'Bar'}
  ]
};

describe('SelectFilter', function() {

  var filter;

  beforeEach(function() {
    filter = new SelectFilter(options);
  });

  describe('\'get\' method', function() {
    it('should return \'null\'', function() {
      expect(filter.get()).to.equal(null);
    });
  });

  describe('\'set\' method', function() {
    it('should set the value and return the choice\'s key, when set to that key', function() {
      filter.set('one');
      expect(filter.get()).to.equal('one');
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
      filter.set('one');
      var param = filter.getParameters();
      expect(param).to.be.an('object');
      expect(param[FILTER_QUERY_PARAM_KEY]).to.equal(0); // choice's 'value' param
    });
  });

});