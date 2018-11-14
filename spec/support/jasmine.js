let Jasmine = require('jasmine')
let jasmine = new Jasmine()

jasmine.loadConfig({
  spec_dir: 'spec',
  spec_files: [
    '../spec/test/*[Ss]pecPO.js'
  ]
})

jasmine.randomizeTests(false)
jasmine.execute()