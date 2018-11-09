let provider = require('../properties/data.json')
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

  for (let i = 0; i < provider.data.length; i++) {
    it('Results quantity Test', async function () {
      await googlePage.searchQuery(provider.data[i].query)

      let number = await googlePage.getQuantityOfSearchResults()
      expect(number).toBeGreaterThan(provider.data[i].resultsNumber)
      console.log(`Query: ${provider.data[i].query}. There is about ${number} results.`)
    })
  }

  for (let i = 0; i < provider.data.length; i++) {
    it('Relevance of results Test', async function () {
      await googlePage.searchQuery(provider.data[i].query)

      let results = await googlePage.getSearchResults()
      results.forEach(async function (element) {
        let result = await element.getText()
        expect(result.includes(provider.data[i].query)).toBeTruthy()
      })
    })
  }
})