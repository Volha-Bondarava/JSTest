let using = require('jasmine-data-provider')
let provider = require('../properties/data.json')
let GoogleSearchPage = require('../PageObject/GoogleSearchPage.js')
let GoogleSearchResultsPage = require('../PageObject/GoogleSearchResultsPage.js')
require('chromedriver')
let webdriver = require('selenium-webdriver')

describe('Test with Page Object', function () {
  let googleBasePage, googleResultsPage

  beforeAll(async function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000
    let driver = await new webdriver.Builder().forBrowser('chrome').build()
    await driver.manage().setTimeouts({implicit: 15000, pageLoad: 15000})
    googleBasePage = new GoogleSearchPage(driver)
  })

  afterAll(function () {
    googleBasePage.close()
    googleResultsPage.close()
  })

  using(provider, function (data) {
    it('Results quantity Test', async function () {
      await googleBasePage.open()
      await googleBasePage.searchQuery(data.query)

      googleResultsPage = new GoogleSearchResultsPage(googleBasePage.driver.getDriver())

      let number = await googleResultsPage.getQuantityOfSearchResults()
      await expect(number).toBeGreaterThan(data.resultsNumber)
      console.log(`Query: ${data.query}. There is about ${number} results.`)
    })

    it('Relevance of results Test', async function () {
      let results = await googleResultsPage.getSearchResults()
      await expect(results.length).toBeGreaterThan(0)
      results.forEach(function (result) {
        let reg = RegExp(data.regexp)
        expect(reg.test(result)).toBeTruthy(`act: ${result}, exp: ${data.query}`)
      })

      await googleResultsPage.navigateToNextPage()
      results = await googleResultsPage.getSearchResults()
      await expect(results.length).toBeGreaterThan(0)
      results.forEach(function (result) {
        let reg = RegExp(data.regexp)
        expect(reg.test(result)).toBeTruthy(`act: ${result}, exp: ${data.query}`)
      })
    })

  })

})