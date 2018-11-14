let using = require('jasmine-data-provider')
let provider = require('../properties/data.json')
let GoogleSearchPage = require('../PageObject/GoogleSearchPage.js')
require('chromedriver')
let webdriver = require('selenium-webdriver')

describe('Test with Page Object', function () {
  let googlePage

  beforeAll(async function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000
    let driver = await new webdriver.Builder().forBrowser('chrome').build()
    await driver.manage().setTimeouts({implicit: 15000, pageLoad: 15000})
    googlePage = new GoogleSearchPage(driver)
  })

  afterAll(async function () {
    await googlePage.quitDriver()
  })

  using(provider, function (data) {
    it('Results quantity Test', async function () {
      await googlePage.open()
      await googlePage.searchQuery(data.query)

      let number = await googlePage.getQuantityOfSearchResults()
      await expect(number).toBeGreaterThan(data.resultsNumber)
      console.log(`Query: ${data.query}. There is about ${number} results.`)
    })

    it('Relevance of results Test', async function () {
      let results = await googlePage.getSearchResults()
      await expect(results.length).toBeGreaterThan(0)
      results.forEach(function (result) {
        let isOk = (result.includes(data.query) || result.includes(data.extra))
        expect(isOk).toBeTruthy()
      })
    })

  })

})