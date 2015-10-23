describe('toDoList.html', function () {

  var
    $scope,
    element,
    template = 'scripts/todo/toDoList.html',
    toDoList = angular.copy(getJSONFixture('toDoList.json'));

  beforeEach(function () {
    mox
      .module('moxExample', template)
      .mockDirectives('toDoFilters')
      .run();

    $scope = createScope({
      addToDoItem: jasmine.createSpy('addToDoItem'),
      markAll: jasmine.createSpy('markAll'),
      editToDoItem: jasmine.createSpy('editToDoItem'),
      remove: jasmine.createSpy('remove'),
      saveEdits: jasmine.createSpy('saveEdits'),
      revertEdits: jasmine.createSpy('revertEdits'),
      clearCompleted: jasmine.createSpy('clearCompleted'),
      completedCount: 1,
      remainingCount: 2,
      status: '',
      toDoList: toDoList
    });
    element = addSelectors(compileTemplate(template, $scope), {
      header: {
        selector: '.header',
        sub: {
          form: 'form'
        }
      },
      main: {
        selector: '.main',
        sub: {
          toggleAll: '.toggle-all',
          items: {
            repeater: 'ul li',
            sub: {
              checkbox: '.toggle',
              label: 'label',
              link: 'a',
              removeIcon: '.destroy',
              editForm: 'form',
              editInput: '.edit'
            }
          }
        }
      },
      footer: {
        selector: '.footer',
        sub: {
          remainingCount: '.todo-count',
          toDoFilters: 'to-do-filters',
          clearCompletedButton: '.clear-completed'
        }
      }
    });
  });

  xit('should hide the main section and footer section when the list is empty', function () {
    expect(element.main()).not.toBeHidden();
    expect(element.footer()).not.toBeHidden();

    $scope.toDoList = [];
    $scope.$digest();

    expect(element.main()).toBeHidden();
    expect(element.footer()).toBeHidden();
  });

  it('should have a field to add new to do items', function () {
    element.header().form().submit();

    expect($scope.addToDoItem).toHaveBeenCalled();
  });

  it('should set all items to done', function () {
    element.main().toggleAll().click();
    expect($scope.markAll).toHaveBeenCalled();
  });

  it('should show the to do items', function () {
    expect(element.main().items()).toHaveLength(3);
    expect(element.main().items(0)).toHaveText($scope.toDoList[0].content);
  });

  it('should filter the toDoItems', function () {
    $scope.statusFilter = { done: false };
    $scope.$digest();

    expect(element.main().items()).toHaveLength(2);
  });

  xit('should toggle the "completed" status', function () {
    element.main().items(1).checkbox().click();
    element.main().items(0).checkbox().click();
    expect($scope.toDoList[0].done).toBe(false);
    expect($scope.toDoList[1].done).toBe(true);
  });

  it('should edit a to do item when double clicking it', function () {
    var firstItem = element.main().items(0);

    expect(firstItem).not.toHaveClass('editing');

    firstItem.label().dblclick();
    expect($scope.editToDoItem).toHaveBeenCalledWith($scope.toDoList[0]);

    $scope.editedToDoItem = $scope.toDoList[0];
    $scope.$digest();

    expect(firstItem).toHaveClass('editing');
  });

  it('should be able to remove the item', function () {
    element.main().items(0).removeIcon().click();
    expect($scope.remove).toHaveBeenCalledWith(0);
  });

  it('should focus the edit field when starting editing', function () {
    $scope.editedToDoItem = $scope.toDoList[0];
    $scope.$digest();
    mox.inject('$timeout').flush();

    expect(element.main().items(0).editInput()).toBeFocused();
  });

  it('should save an edited to do item when submitting', function () {
    $scope.editedToDoItem = 'Edited to do';
    element.main().items(0).editForm().submit();
    expect($scope.saveEdits).toHaveBeenCalledWith($scope.editedToDoItem, 'submit');
  });

  it('should save an edited to do item when blurring', function () {
    $scope.editedToDoItem = 'Edited to do';
    element.main().items(0).editInput().blur();
    expect($scope.saveEdits).toHaveBeenCalledWith($scope.editedToDoItem, 'blur');
  });

  it('should revert edits when pressing escape while editing', function () {
    var e = angular.element.Event('keydown');
    e.keyCode = 0;
    element.main().items(0).editInput().trigger(e);
    expect($scope.revertEdits).not.toHaveBeenCalledWith($scope.toDoList[0]);

    e.keyCode = mox.inject('ESCAPE_KEY');
    element.main().items(0).editInput().trigger(e);
    expect($scope.revertEdits).toHaveBeenCalledWith($scope.toDoList[0]);
  });

  it('should add a "completed" class to the list item when the to do item is completed', function () {
    expect(element.main().items(0)).toHaveClass('completed');
    expect(element.main().items(1)).not.toHaveClass('completed');
    expect(element.main().items(2)).not.toHaveClass('completed');
  });

  it('should show the remaining count', function () {
    expect(element.footer().remainingCount()).toHaveText('2 items left');
  });

  it('should have a directive for showing the to do list filters', function () {
    expect(element.footer().toDoFilters()).toContainIsolateScope({
      status: $scope.status
    });
  });

  it('should have a button to clear the completed items', function () {
    element.footer().clearCompletedButton().click();
    expect($scope.clearCompleted).toHaveBeenCalled();
  });

  it('should hide the clear completed button when there are no completed items', function () {
    expect(element.footer().clearCompletedButton()).not.toBeHidden();

    $scope.completedCount = 0;
    $scope.$digest();

    expect(element.footer().clearCompletedButton()).toBeHidden();
  });

  xdescribe('the link between controller and view (midway test)', function () {
    it('should have the same toDoList on the scope', function () {
      // TODO: service wegmocken
      var ctrlScope = createScope();
      createController('ToDoListController', ctrlScope);
      $scope.$digest();

      expect(ctrlScope.toDoList).toEqual(toDoList);
      //var element = compileTemplate(template, ctrlScope);
    });
  });
});
