let GoogleSearchPage = require('../PageObject/GoogleSearchPage.js')
require('chromedriver')
let webdriver = require('selenium-webdriver')

describe('Test with Page Object', function () {
  let driver
  let googlePage

  beforeAll(async function () {
    driver = await new webdriver.Builder().forBrowser('chrome').build()
    googlePage = new GoogleSearchPage(driver)
  })

  afterAll(async function () {
    await driver.quit()
  })

  it('Results quantity Test', async function () {
    await googlePage.open()
    setTimeout(function () {

    }, 10000)
    await googlePage.typeSearchQuery('iTechArt')
    await googlePage.clickSearchButton()
    let number = await googlePage.getQuantityOfSearchResults()
    if (number < 30000) {
      fail('There is few results (fewer than 6660) ')
    }
    console.log(`There is about ${number} results.`)
  })

  it('Relevance of results Test', async function () {
    let results = await googlePage.getSearchResults()
    results.forEach(async function (element) {
      let result = await element.getText()
      expect(result.includes('iTechArt')).toBeTruthy()
    })
  })

})