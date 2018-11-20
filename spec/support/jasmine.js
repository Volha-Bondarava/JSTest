let Jasmine = require('jasmine')
let jasmine = new Jasmine()

let webdriver = require('selenium-webdriver')
let logger = require('../logger/customJasmineLogger')

module.exports = {
  before: async function () {
    let driver = await new webdriver.Builder().forBrowser('chrome').build()
    await driver.manage().setTimeouts({implicit: 15000, pageLoad: 15000})
    return driver
  },

  after: async function (driver) {
    return await driver.quit()
  }
}

jasmine.requires.push('chromedriver')
jasmine.loadConfig({
  spec_dir: 'spec',
  spec_files: [
    '../spec/test/*SpecPO.js',
  ],
  helpers: [
    '../spec/helpers/specHelper.js'
  ]
})
jasmine.addReporter(logger)
jasmine.randomizeTests(false)
jasmine.execute()