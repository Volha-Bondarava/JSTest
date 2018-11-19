let using = require('jasmine-data-provider')
let provider = require('../properties/data.json')
const {Key, By, until} = require('selenium-webdriver')
let webdriver = require('selenium-webdriver')

describe('Test without Page Object', function () {
  let driver

  let searchFieldName = 'q'
  let resultStatsId = 'resultStats'
  let searchResultsXpath = '//div[@id=\'search\']//a/h3'

  beforeAll(async function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000
    driver = await new webdriver.Builder().forBrowser('chrome').build()
  })

  afterAll(async function () {
    await driver.quit()
  })

  using(provider, function (data) {
    it('Results quantity Test', async function () {
      await driver.get('http://google.by')
      await driver.wait(until.elementLocated(By.name(searchFieldName)), 15000)
      await driver.findElement(By.name(searchFieldName)).sendKeys(data.query, Key.RETURN)
      await driver.wait(until.elementLocated(By.id(resultStatsId)), 15000)

      let text = await driver.findElement(By.id(resultStatsId)).getText()
      text = text.substring(0, text.length - 11)
      let number = parseInt(text.replace(/\D+/g, ''))
      await expect(number).toBeGreaterThan(data.resultsNumber)
      console.log(`Запрос: ${data.query}. Количество результатов: ${number}`)
    })

    it('Relevance of results Test', async function () {
      let values = await driver.findElements(By.xpath(searchResultsXpath))

      values.forEach(async function (element) {
        let result = await element.getText()
        let reg = RegExp(data.regexp)
        await expect(reg.test(result)).toBeTruthy(`act: ${result}, exp: ${data.query}`)
      })
    })

  })

})
