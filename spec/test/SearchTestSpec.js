require('chromedriver')
const {Key, By, until} = require('selenium-webdriver')
let webdriver = require('selenium-webdriver')

describe('Test without Page Object', function () {
  let driver

  beforeAll(async function () {
    this.driver = await new webdriver.Builder().forBrowser('chrome').build()
  })

  afterAll(async function () {
    await this.driver.quit()
  })

  it('Results quantity Test', async function () {
    await this.driver.get('http://google.by')
    await this.driver.wait(until.elementLocated(By.name('q')), 8000)
    await this.driver.findElement(By.name('q')).sendKeys('iTechArt', Key.RETURN)
    await this.driver.wait(until.elementLocated(By.id('resultStats')))

    let text = await this.driver.findElement(By.id('resultStats')).getText()
    text = text.substring(0, text.length - 11)
    let number = parseInt(text.replace(/\D+/g, ''))
    if (number < 30000) {
      fail('There is few results (fewer than 6660) ')
    }
    console.log(`Количество результатов: ${number}`)
  })

  it('Relevance of results Test', async function f () {
    let values = await this.driver.findElements(By.xpath('//div[@id=\'search\']//h3'))
    values.forEach(async function (element) {
      let result = await element.getText()
      expect(result.includes('iTechArt')).toBeTruthy()
    })
  })
})
