describe('toDoItem directive', function () {

  var
    $scope,
    element;

  beforeEach(function () {
    mox
      .module('moxExample', 'scripts/todo/toDoFilters.html')
      .mockServices('upperFilter')
      .setupResults(function () {
        return {
          upperFilter: function (input) { return input; }
        };
      })
      .run();

    $scope = createScope({
      status: ''
    });
    element = addSelectors(compileHtml('<to-do-filters status="status"></to-do-filters>', $scope), {
      items: {
        repeater: 'li',
        sub: {
          link: 'a'
        }
      }
    });
  });

  it('should show three filter links', function () {
    expect(element.items()).toHaveLength(3);

    var allLink = element.items(0).link();
    expect(allLink).toHaveText('All');
    expect(allLink).toHaveAttr('href', '#/');

    var activeLink = element.items(1).link();
    expect(activeLink).toHaveText('Active');
    expect(activeLink).toHaveAttr('href', '#/active');

    var completedLink = element.items(2).link();
    expect(completedLink).toHaveText('Completed');
    expect(completedLink).toHaveAttr('href', '#/completed');
  });

  it('should add the "selected" class to the status that is active', function () {
    expect(element.items(0).link()).toHaveClass('selected');
    expect(element.items(1).link()).not.toHaveClass('selected');
    expect(element.items(2).link()).not.toHaveClass('selected');

    $scope.status = 'active';
    $scope.$digest();

    expect(element.items(0).link()).not.toHaveClass('selected');
    expect(element.items(1).link()).toHaveClass('selected');
    expect(element.items(2).link()).not.toHaveClass('selected');
  });
});
