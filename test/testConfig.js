var path = typeof window.__karma__ !== 'undefined' ? 'base/' : '';
jasmine.getJSONFixtures().fixturesPath = path + 'test/mock';
jasmine.getFixtures().fixturesPath = path + 'test/mock/html';
