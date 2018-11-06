let Jasmine = require('jasmine');
let jasmine = new Jasmine();

jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.execute(['spec/SearchTestSpec.js']);
//jasmine.execute(['spec/PageObject/SearchTestSpecPO.js']);
