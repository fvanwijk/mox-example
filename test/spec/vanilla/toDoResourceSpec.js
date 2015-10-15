describe('ToDoResource', function () {

  beforeEach(module('moxExample'));

  var
    $httpBackend,
    toDoList = [
      { content: 'Start new project', done: true },
      { content: 'Include Mox', done: false },
      { content: 'Write tests', done: false }
    ],
    toDoResource;

  beforeEach(angular.mock.inject(function (_$httpBackend_, _ToDoResource_) {
    toDoResource = _ToDoResource_;

    $httpBackend = _$httpBackend_;

    $httpBackend.expectGET('scripts/todo/toDoList.json').respond(toDoList);
  }));

  it('should call the url scripts/todo/toDoList.json and return an array with a to do list', function () {
    toDoResource.query();
    $httpBackend.flush();
  });

});
