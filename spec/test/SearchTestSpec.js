let using = require('jasmine-data-provider')
let provider = require('../properties/data.json')
const {Key, By, until} = require('selenium-webdriver')
let webdriver = require('selenium-webdriver')

describe('Test without Page Object', function () {
  let driver

  beforeAll(async function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
    this.driver = await new webdriver.Builder().forBrowser('chrome').build()
  })

  afterAll(async function () {
    await this.driver.quit()
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
  })

  using(provider, function (data) {
    it('Results quantity Test', async function () {
      await this.driver.get('http://google.by')
      await this.driver.wait(until.elementLocated(By.name('q')), 10000)
      await this.driver.findElement(By.name('q')).sendKeys(data.query, Key.RETURN)
      await this.driver.wait(until.elementLocated(By.id('resultStats')), 10000)

      let text = await this.driver.findElement(By.id('resultStats')).getText()
      text = text.substring(0, text.length - 11)
      let number = parseInt(text.replace(/\D+/g, ''))
      if (number < data.resultsNumber) {
        fail(`There is few results (fewer than ${data.resultsNumber}) `)
      }
      console.log(`Запрос: ${data.query}. Количество результатов: ${number}`)
    })

    it('Relevance of results Test', async function () {
      let values = await this.driver.findElements(By.xpath('//div[@id=\'search\']//a/h3'))
      values.forEach(async function (element) {
        let result = await element.getText()
        expect(result.includes(data.query)).toBeTruthy()
      })
    })

  })

})
