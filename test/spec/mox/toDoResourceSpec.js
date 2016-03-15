describe('ToDoResource', function () {

  it('should call the url scripts/todo/toDoList.json and return an array with todos', function () {
    mox.module('moxExample').run();

    m.requestTest()
      .whenMethod(m.inject('ToDoResource').query)
      .expectGet('scripts/todo/toDoList.json')
      .andRespond([])
      .run();
  });

});
