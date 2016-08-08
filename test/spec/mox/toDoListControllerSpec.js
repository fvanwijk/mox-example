describe('ToDoListController', function () {
  var
    $log,
    $scope,
    toDoList = getJSONFixture('toDoList.json');

  function initController() {
    m.createController('ToDoListController', $scope);
    $scope.$digest();
  }

  beforeEach(function () {
    mox
      .module('moxExample')
      .mockServices(
        ['$routeParams', { status: 'completed' }], // see moxConfig.js
        'filterFilter',
        'ToDoService'
      )
      .setupResults(function () {
        return {
          ToDoService: {
            getToDoList: m.promise(toDoList),
            saveToDoItem: m.promise(toDoList[0])
          }
        };
      })
      .run();

    mox.get.filterFilter.and.callThrough();
    $scope = m.createScope();

    // We could also mock $log
    $log = m.inject('$log');
    spyOn($log, 'log');
  });

  describe('on initialization', function () {
    it('should start with an empty to do list', function () {
      m.createController('ToDoListController', $scope);
      expect($scope.toDoList).toEqual([]);
    });

    it('should fetch a to do list and add it to the scope', function () {
      initController();
      expect($scope.toDoList).toEqual(toDoList);
    });

    it('should $log a message when it fails', function () {
      var msg = { data: 'FAIL!' };
      mox.get.ToDoService.getToDoList.and.returnValue(m.reject(msg));

      initController();

      expect($log.log).toHaveBeenCalledWith(msg.data);
    });

    it('should set the status on the scope, based on the $routeParams', function () {
      // $routeParams is default mocked as { status: 'completed' }
      mox.get.$routeParams.status = undefined;
      initController();
      expect($scope.status).toBe('');

      mox.get.$routeParams.status = 'active';
      initController();
      expect($scope.status).toBe('active');
    });

    it('should set the status filter based on the status', function () {
      initController();
      expect($scope.statusFilter).toEqual({ done: true });

      mox.get.$routeParams.status = 'active';
      initController();
      expect($scope.statusFilter).toEqual({ done: false });

      mox.get.$routeParams.status = undefined;
      initController();
      expect($scope.statusFilter).toEqual({});
    });

  });

  describe('when the toDoList is changed', function () {
    beforeEach(function () {
      initController();
    });

    it('should update the remaining count using the filterFilter', function () {
      expect($scope.remainingCount).toBe(2);

      $scope.toDoList[1].done = true;
      $scope.$digest();

      expect($scope.remainingCount).toBe(1);

      mox.get.filterFilter.and.returnValue([]);
      // Whatever change
      $scope.toDoList[1].done = false;
      $scope.$digest();

      expect($scope.remainingCount).toBe(0);
    });

    it('should update the completedCount using the filterFilter', function () {
      expect($scope.completedCount).toBe(1);

      $scope.toDoList[1].done = true;
      $scope.$digest();

      expect($scope.completedCount).toBe(2);
    });

    it('should set the allChecked boolean', function () {
      expect($scope.allChecked).toBe(false);

      $scope.toDoList[1].done = true;
      $scope.toDoList[2].done = true;
      $scope.$digest();

      expect($scope.allChecked).toBe(true);
    });
  });

  describe('the addToDoItem() scope method', function () {
    beforeEach(function () {
      initController();
    });

    describe('when the trimmed content is not empty', function () {
      beforeEach(function () {
        $scope.newToDoItem = 'New item ';
        $scope.addToDoItem();
      });

      it('should add a new to do item to the list', function () {
        expect($scope.toDoList).toHaveLength(4);
        expect($scope.toDoList[3]).toEqual({
          content: 'New item',
          done: false
        });
      });

      it('should reset the new item', function () {
        expect($scope.newToDoItem).toBeUndefined();
      });
    });

    describe('when the trimmed content is empty', function () {
      beforeEach(function () {
        $scope.newToDoItem = ' ';
        $scope.addToDoItem();
      });

      it('should do nothing', function () {
        expect($scope.toDoList).toHaveLength(3);
      });
    });
  });

  describe('the markAll() scope method', function () {
    it('should mark all items\' done value the same as the allChecked value', function () {
      initController();
      $scope.markAll();
      expect($scope.toDoList[0].done).toBe(false);
      expect($scope.toDoList[1].done).toBe(false);
      expect($scope.toDoList[2].done).toBe(false);

      $scope.allChecked = true;
      $scope.markAll();
      expect($scope.toDoList[0].done).toBe(true);
      expect($scope.toDoList[1].done).toBe(true);
      expect($scope.toDoList[2].done).toBe(true);

    });
  });

  describe('the remove() scope method', function () {
    beforeEach(function () {
      initController();
      $scope.remove(1);
    });

    it('should remove the item with index $index from the list', function () {
      expect($scope.toDoList).toHaveLength(2);
      expect($scope.toDoList[1]).toEqual({
        content: 'Write tests',
        done: false
      });
    });
  });

  describe('the clearCompleted method', function () {
    beforeEach(function () {
      initController();
      $scope.clearCompleted();
    });

    it('should remove the items that are done from the list', function () {
      expect($scope.toDoList).toHaveLength(2);
      expect($scope.toDoList[0]).toEqual({
        content: 'Include Mox',
        done: false
      });
      expect($scope.toDoList[1]).toEqual({
        content: 'Write tests',
        done: false
      });
    });
  });

  describe('the editToDoItem() scope method', function () {
    beforeEach(function () {
      initController();
      $scope.editToDoItem($scope.toDoList[1]);
    });

    it('sets the editedDoToItem to the passed item', function () {
      expect($scope.editedToDoItem).toBe($scope.toDoList[1]);
    });

    it('Copies the original item so that it can be reverted', function () {
      expect($scope.originalToDoItem).not.toBe($scope.toDoList[1]);
      expect($scope.originalToDoItem).toEqual($scope.toDoList[1]);
    });
  });

  describe('the saveEdits() scope method', function () {
    beforeEach(function () {
      initController();
      $scope.editedToDoItem = $scope.toDoList[1];
    });

    describe('when calling as blur callback without a submit, or as submit callback', function () {
      beforeEach(function () {
        $scope.toDoList[1].content = 'New content ';
        $scope.saveEdits($scope.toDoList[1], 'blur');
      });

      it('should trim the content', function () {
        expect($scope.toDoList[1].content).toBe('New content');
      });

      it('should exit edit mode', function () {
        expect($scope.editedToDoItem).toBeUndefined();
      });
    });

    describe('when the edited trimmed content is empty', function () {
      beforeEach(function () {
        initController();
        $scope.toDoList[1].content = ' ';
        $scope.saveEdits($scope.toDoList[1], 'submit');
      });

      it('should remove the item', function () {
        expect($scope.toDoList).toHaveLength(2);
      });

      it('should exit edit mode', function () {
        expect($scope.editedToDoItem).toBeUndefined();
      });
    });

    describe('when calling as blur callback when there is also a submit', function () {
      beforeEach(function () {
        $scope.saveEvent = 'submit';
        $scope.toDoList[1].content = 'New content ';
        $scope.saveEdits($scope.toDoList[1], 'blur');
      });

      it('should not trim', function () {
        // Note that were editing the array item directly, so the content has been changed anyway
        expect($scope.toDoList[1].content).toBe('New content ');
      });
    });

    describe('when calling while reverting the edit', function () {
      beforeEach(function () {
        $scope.reverted = true;
        $scope.toDoList[1].content = 'New content ';
        $scope.saveEdits($scope.toDoList[1], 'blur');
      });

      it('should not trim', function () {
        expect($scope.toDoList[1].content).toBe('New content ');
      });
    });
  });

  describe('the revertEdits() scope method', function () {
    beforeEach(function () {
      initController();
      $scope.originalToDoItem = angular.copy($scope.toDoList[1]);
      $scope.toDoList[1].content = 'New content';
      $scope.revertEdits($scope.toDoList[1]);
    });

    it('should reset the original item', function () {
      expect($scope.toDoList[1].content).toBe('Include Mox');
    });

    it('should exit edit mode', function () {
      expect($scope.editedToDoItem).toBeUndefined();
      expect($scope.originalToDoItem).toBeUndefined();
    });
  });

  describe('the save() scope method', function () {
    var saveResult;

    beforeEach(function () {
      initController();
      saveResult = $scope.save(toDoList[0]);
    });

    it('should save the ToDoItem via the ToDoService', function () {
      expect(mox.get.ToDoService.saveToDoItem).toHaveBeenCalledWith(toDoList[0]);
    });

    it('should return the result promise', function () {
      expect(saveResult).toResolveWith(toDoList[0]);
    });

    describe('when the ToDoService rejects', function () {
      beforeEach(function () {
        mox.get.ToDoService.saveToDoItem.and.returnValue(m.reject('Fail!'));
        initController();
      });

      it('should log an error', function () {
        $scope.save(toDoList[0]);
        $scope.$digest();
        expect($log.log).toHaveBeenCalledWith('Error while saving');
      });
    });
  });
});
