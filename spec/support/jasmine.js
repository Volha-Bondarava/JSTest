let Jasmine = require('jasmine')
let jasmine = new Jasmine()

jasmine.loadConfig({
  spec_dir: 'spec',
  spec_files: [
    '../../../spec/test/SearchTestSpecPO.js'
  ]
})

jasmine.randomizeTests(false)
jasmine.execute()