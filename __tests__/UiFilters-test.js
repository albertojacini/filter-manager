jest.dontMock('../core');
jest.dontMock('../search');
jest.dontMock('../select');
jest.dontMock('lodash');

describe('UiFilterList', function() {

  var UiFilterListConstructor,
    filterList;

  // mock filter configs
  var mySelectFilterConfig = {
    type: 'select',
    key: 'city',
    extra: {
      paramKey: 'city',
      label: 'City',
      // unitOfMeasure: 'SCORE',
      choices: [
        {value: 'rome', label: 'Rome'},
        {value: 'milan', label:  'Milan'},
        {value: 'naples', label:  'Naples'}
      ]
    }
  };

  beforeEach(function() {
    UiFilterListConstructor = require('../core');
    filterList = new UiFilterListConstructor();
  });

  it('an empty list of filters when no filter is added', function() {
    var activeFilters = filterList.getActiveFilters();
    expect(activeFilters).toEqual(jasmine.any(Array));
    expect(activeFilters.length).toBe(0);
  });

  it('can not add filters of supported types', function() {
    expect(function(){filterList.addFilter('foo', 'city', {});}).toThrow();
  });

  it('can add filters of supported type', function() {
    expect(function(){filterList.addFilter('select', 'city', {});}).not.toThrow();
  });

  it('can add a "search" filter', function() {
    var SEARCH_STRING = 'foo',
      FILTER_KEY = 'first-search-filter';
    var val;
    filterList.addFilter('search', FILTER_KEY, {paramKey: 's'});
    filterList.updateFilter(FILTER_KEY, SEARCH_STRING);
    val = filterList.getFilter(FILTER_KEY).getValue();
    expect(val).toBe(SEARCH_STRING);
  });

});