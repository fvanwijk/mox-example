describe('upperFilter', function () {

  var upperFilter;

  beforeEach(function () {
    mox
      .module('moxExample')
      .run();

    upperFilter = mox.inject('upperFilter');
  });

  it('should return the input in uppercase if the filter is active', function () {
    expect(upperFilter('abc', true)).toEqual('ABC');
  });

  it('should do nothing if the filter is inactive', function () {
    expect(upperFilter('abc', false)).toEqual('abc');
  });
});
