let using = require('jasmine-data-provider')
let provider = require('../properties/data.json')
let GoogleSearchPage = require('../PageObject/GoogleSearchPage.js')
require('chromedriver')
let webdriver = require('selenium-webdriver')

describe('Test with Page Object', function () {
  let googlePage

  beforeAll(async function () {
    googlePage = new GoogleSearchPage(
      await new webdriver.Builder().forBrowser('chrome').build())
  })

  afterAll(async function () {
    await googlePage.quitDriver()
  })

  using(provider, function (data) {
    it('Results quantity Test', async function () {
      googlePage.open()
      googlePage.typeSearchQuery(data.query)
      await googlePage.clickSearchButton()

      let number = await googlePage.getQuantityOfSearchResults()
      expect(number).toBeGreaterThan(data.resultsNumber)
      console.log(`Query: ${data.query}. There is about ${number} results.`)
    })

    it('Relevance of results Test', async function () {

      let results = await googlePage.getSearchResults()
      results.forEach(async function (element) {
        let result = await element.getText()
        expect(result.includes(data.query)).toBeTruthy()
      })
    })
  })
})