let using = require('jasmine-data-provider')
let provider = require('../properties/data.js')
let GoogleSearchPage = require('../PageObject/GoogleSearchPage.js')
require('chromedriver')
let webdriver = require('selenium-webdriver')

describe('Test with Page Object', function () {
  let driver
  let googlePage

  beforeAll(async function () {
    this.driver = await new webdriver.Builder().forBrowser('chrome').build()
    googlePage = new GoogleSearchPage(this.driver)
  })

  afterAll(async function () {
    await this.driver.quit()
  })

  using(provider(), function (data) {
    it('Results quantity Test', async function () {
      await googlePage.searchQuery(data.query)
      
      let number = await googlePage.getQuantityOfSearchResults()
      if (number < data.resultsNumber) {
        fail(`There is few results (fewer than ${data.resultsNumber}) `)
      }
      console.log(`Query: ${data.query}. There is about ${number} results.`)
    })
  })

  using(provider(), function (data) {
    it('Relevance of results Test', async function () {
      await googlePage.searchQuery(data.query)

      let results = await googlePage.getSearchResults()
      results.forEach(async function (element) {
        let result = await element.getText()
        expect(result.includes(data.query)).toBeTruthy()
      })
    })
  })
})