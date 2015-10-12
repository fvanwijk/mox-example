describe('PersonService', function () {

  var persons = getJSONFixture('persons.json');

  beforeEach(function () {
    mox
      .module('myApp')
      .mockServices('PersonResource')
      .setupResults(function () {
        return {
          PersonResource: { query: resourceResult(persons) }
        };
      })
      .run();
  });

  describe('the getPersons method', function () {

    it('should return list of PersonResources', function () {
      expect(mox.inject('personService').getPersons()).toHaveBeenResolvedWith(persons);
    });

  });
});
