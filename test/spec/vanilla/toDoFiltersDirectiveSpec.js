describe('toDoFilters directive', function () {

  beforeEach(module('moxExample', 'scripts/todo/toDoFilters.html', function ($provide) {
    $provide.value('upperFilter', jasmine.createSpy('upperFilter') // original implementation not available
      .and.callFake(function (input) {
        return input;
      })
    );
  }));

  var
    $scope,
    element;

  beforeEach(angular.mock.inject(function ($rootScope, $compile) {
    $scope = $rootScope.$new();
    $scope.status = '';
    element = $compile('<to-do-filters status="status"></to-do-filters>')($scope);
    $scope.$digest();
  }));

  function getLink(index) {
    return element.find('li').eq(index).find('a');
  }

  it('should show three filter links', function () {
    expect(element.find('li').length).toBe(3);

    var allLink = getLink(0);
    expect(allLink.text()).toBe('All');
    expect(allLink.attr('href')).toBe('#/');

    var activeLink = getLink(1);
    expect(activeLink.text()).toBe('Active');
    expect(activeLink.attr('href')).toBe('#/active');

    var completedLink = getLink(2);
    expect(completedLink.text()).toBe('Completed');
    expect(completedLink.attr('href')).toBe('#/completed');
  });

  it('should add the "selected" class to the status that is active', function () {
    expect(getLink(0)).toHaveClass('selected');
    expect(getLink(1)).not.toHaveClass('selected');
    expect(getLink(2)).not.toHaveClass('selected');

    $scope.status = 'active';
    $scope.$digest();

    expect(getLink(0)).not.toHaveClass('selected');
    expect(getLink(1)).toHaveClass('selected');
    expect(getLink(2)).not.toHaveClass('selected');
  });
});
