describe('ToDoResource', function () {

  it('should call the url scripts/todo/toDoList.json and return an array with todos', function () {
    mox.module('moxExample').run();

    requestTest()
      .whenMethod(mox.inject('ToDoResource').query)
      .expectGet('scripts/todo/toDoList.json')
      .andRespond([])
      .run();
  });

});
