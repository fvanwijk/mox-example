describe('upperFilter', function () {

  beforeEach(module('moxExample'));

  var upperFilter;

  beforeEach(angular.mock.inject(function (_upperFilter_) {
    upperFilter = _upperFilter_;
  }));

  it('should return the input in uppercase if the filter is active', function () {
    expect(upperFilter('abc', true)).toEqual('ABC');
  });

  it('should do nothing if the filter is inactive', function () {
    expect(upperFilter('abc', false)).toEqual('abc');
  });
});
