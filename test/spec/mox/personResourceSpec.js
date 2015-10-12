describe('PersonResource', function () {

  it('should call the url scripts/persons/persons.json and return an array with persons', function () {
    mox.module('myApp').run();

    requestTest()
      .whenMethod(mox.inject('PersonResource').query)
      .expectGet('scripts/persons/persons.json')
      .andRespond([])
      .run();
  });

});
