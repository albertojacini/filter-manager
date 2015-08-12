jest.dontMock('../search');
jest.dontMock('lodash');

describe('UiFilterList', function() {

  var FilterConstructor,
    filter,
    VALUE;
  var PARAM_KEY = 'search';

  // Mock config
  var options = {
    paramKey: PARAM_KEY
  };

  beforeEach(function() {
    FilterConstructor = require('../search');
    filter = new FilterConstructor(options);
  });

  describe('when initialized with default value...', function () {

    it('has getValue returning an empty string', function() {
      expect(filter.getValue()).toBe('');
    });

    it('is set to default state', function() {
      expect(filter.isSetToDefaultState()).toBe(true);
    });

    it('has getParameters returning null', function() {
      expect(filter.getParameters()).toBe(null);
    });

  });

  describe('when a value is set with setValue...', function() {

    beforeEach(function() {
      VALUE = 'foo';
      filter.setValue(VALUE);
    });

    it('getValue returns that value', function() {
      expect(filter.getValue()).toBe(VALUE);
    });

    it('getParameters returns a param object', function () {
      var params = filter.getParameters();
      expect(params[PARAM_KEY]).toBe(VALUE);
    });

  });

});