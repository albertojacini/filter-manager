var should = require('chai').should(),
    FilterList = require('../src/core');

describe('FilterList', function() {

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
    expect(activeFilters).to.equal(jasmine.any(Array));
    expect(activeFilters.length).toBe(0);
  });

  it('can not add filters of supported types', function() {
    expect(function(){filterList.addFilter('foo', 'city', {});}).to.throw();
  });

  it('can add filters of supported type', function() {
    expect(function(){filterList.addFilter('select', 'city', {});}).to.not.throw();
  });

  it('can add a "search" filter', function() {
    var SEARCH_STRING = 'foo',
      FILTER_KEY = 'first-search-filter';
    var val;
    filterList.addFilter('search', FILTER_KEY, {paramKey: 's'});
    filterList.updateFilter(FILTER_KEY, SEARCH_STRING);
    val = filterList.getFilter(FILTER_KEY).getValue();
    expect(val).to.be(SEARCH_STRING);
  });

});