var FilterListFactory = require('./FilterListFactory');
var SearchFilter = require('./SearchFilter');
var SelectFilter = require('./SelectFilter');
var MultiselectFilter = require('./MultiselectFilter');
var RangeFilter = require('./RangeFilter');

var constructors = [
  RangeFilter,
  MultiselectFilter,
  SelectFilter,
  SearchFilter

];

module.exports = FilterListFactory(constructors);