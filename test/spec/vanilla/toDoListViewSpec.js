describe('toDoList.html', function () {

  var
    $compile,
    $rootScope,
    $scope,
    $templateCache,
    element,
    template = 'scripts/todo/toDoList.html',
    toDoList = [
      { content: 'Start new project', done: true },
      { content: 'Include Mox', done: false },
      { content: 'Write tests', done: false }
    ];

  function compileTemplate(scope) {
    return $compile('<div>' + $templateCache.get(template) + '</div>')(scope);
  }

  function getItems() {
    return element.find('.main li');
  }

  beforeEach(function () {
    angular.module('moxExample')
      .decorator('toDoFiltersDirective', function ($delegate) {
        delete $delegate[0].link;
        delete $delegate[0].templateUrl;
        return $delegate;
      });
    angular.mock.module('moxExample', 'scripts/todo/toDoList.html');

    angular.mock.inject(function (_$compile_, _$rootScope_, _$templateCache_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $templateCache = _$templateCache_;

      $scope = $rootScope.$new();
      $scope.toDoList = angular.copy(toDoList);
      $scope.addToDoItem = jasmine.createSpy('addToDoItem');
      $scope.markAll = jasmine.createSpy('markAll');
      $scope.editToDoItem = jasmine.createSpy('editToDoItem');
      $scope.remove = jasmine.createSpy('remove');
      $scope.saveEdits = jasmine.createSpy('saveEdits');
      $scope.revertEdits = jasmine.createSpy('revertEdits');
      $scope.clearCompleted = jasmine.createSpy('clearCompleted');
      $scope.completedCount = 1;
      $scope.remainingCount = 2;
      element = compileTemplate($scope);
      $scope.$digest();
    });
  });

  it('should hide the main section and footer section when the list is empty', function () {
    expect(element.find('.main').hasClass('ng-hide')).toBe(false);
    expect(element.find('.footer').hasClass('ng-hide')).toBe(false);

    $scope.toDoList = [];
    $scope.$digest();

    expect(element.find('.main').hasClass('ng-hide')).toBe(true);
    expect(element.find('.footer').hasClass('ng-hide')).toBe(true);
  });

  it('should have a field to add new to do items', function () {
    element.find('.header form').triggerHandler('submit');

    expect($scope.addToDoItem).toHaveBeenCalled();
  });

  it('should set all items to done', function () {
    element.find('.main .toggle-all').click();
    expect($scope.markAll).toHaveBeenCalled();
  });

  it('should show the to do items', function () {
    var items = getItems();
    expect(items.length).toBe(3);
    expect(items.eq(0)).toHaveText($scope.toDoList[0].content);
  });

  it('should filter the toDoItems', function () {
    $scope.statusFilter = { done: false };
    $scope.$digest();

    expect(element.find('.main li').length).toBe(2);
  });

  it('should toggle the "completed" status', function () {
    var items = getItems();
    items.eq(1).find('.toggle').click();
    items.eq(0).find('.toggle').click();
    expect($scope.toDoList[0].done).toBe(false);
    expect($scope.toDoList[1].done).toBe(true);
  });

  it('should edit a to do item when double clicking it', function () {
    var firstItem = getItems().eq(0);

    expect(firstItem.hasClass('editing')).toBe(false);

    firstItem.find('label').dblclick();
    expect($scope.editToDoItem).toHaveBeenCalledWith($scope.toDoList[0]);

    $scope.editedToDoItem = $scope.toDoList[0];
    $scope.$digest();

    expect(firstItem).toHaveClass('editing');
  });

  it('should be able to remove the item', function () {
    getItems().eq(0).find('.destroy').click();
    expect($scope.remove).toHaveBeenCalledWith(0);
  });

  it('should focus the edit field when starting editing', angular.mock.inject(function ($timeout) {
    var body = angular.element(document.body);
    var container = angular.element('<div id="fixtureContainer"></div>');
    container.append(element);
    body.append(container);

    $scope.editedToDoItem = $scope.toDoList[0];
    $scope.$digest();
    $timeout.flush();

    expect(getItems().eq(0).find('.edit')).toBeFocused();

    body.find('#fixtureContainer').remove();
  }));

  it('should save an edited to do item when submitting', function () {
    $scope.editedToDoItem = 'Edited to do';
    getItems().eq(0).find('form').triggerHandler('submit');
    expect($scope.saveEdits).toHaveBeenCalledWith($scope.editedToDoItem, 'submit');
  });

  it('should save an edited to do item when blurring', function () {
    $scope.editedToDoItem = 'Edited to do';
    getItems().eq(0).find('.edit').blur();
    expect($scope.saveEdits).toHaveBeenCalledWith($scope.editedToDoItem, 'blur');
  });

  it('should revert edits when pressing escape while editing', angular.mock.inject(function (ESCAPE_KEY) {
    var e = angular.element.Event('keydown');

    function triggerEdit() {
      getItems().eq(0).find('.edit').trigger(e);
    }

    e.keyCode = 0;
    triggerEdit();
    expect($scope.revertEdits).not.toHaveBeenCalledWith($scope.toDoList[0]);

    e.keyCode = ESCAPE_KEY;
    triggerEdit();
    expect($scope.revertEdits).toHaveBeenCalledWith($scope.toDoList[0]);
  }));

  it('should add a "completed" class to the list item when the to do item is completed', function () {
    var items = getItems();
    expect(items.eq(0).hasClass('completed')).toBe(true);
    expect(items.eq(1).hasClass('completed')).toBe(false);
    expect(items.eq(2).hasClass('completed')).toBe(false);
  });

  it('should show the remaining count', function () {
    expect(element.find('.footer .todo-count').text()).toBe('2 items left');
  });

  it('should have a directive for showing the to do list filters', function () {
    expect(element.find('to-do-filters').isolateScope()).toEqual(jasmine.objectContaining({
      status: $scope.status
    }));
  });

  it('should have a button to clear the completed items', function () {
    element.find('footer .clear-completed').click();
    expect($scope.clearCompleted).toHaveBeenCalled();
  });

  it('should hide the clear completed button when there are no completed items', function () {
    expect(element.find('footer .clear-completed').hasClass('ng-hide')).toBe(false);

    $scope.completedCount = 0;
    $scope.$digest();

    expect(element.find('footer .clear-completed').hasClass('ng-hide')).toBe(true);
  });
});
