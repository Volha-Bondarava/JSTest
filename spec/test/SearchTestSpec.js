require('chromedriver')
const {Key, By, until} = require('selenium-webdriver')
let webdriver = require('selenium-webdriver')

describe('Test without Page Object', function () {
  let driver

  beforeAll(async function () {
    driver = await new webdriver.Builder().forBrowser('chrome').build()
  })

  afterAll(async function () {
    await driver.quit()
  })

  it('Results quantity Test', async function () {
    await driver.get('http://google.by')
    setTimeout(function () {

    }, 6000)
    await driver.findElement(By.name('q')).sendKeys('iTechArt', Key.RETURN)
    await driver.wait(until.titleIs('iTechArt - Пошук Google'))

    let text = await driver.findElement(By.id('resultStats')).getText()
    text = text.substring(0, text.length - 11)
    let number = parseInt(text.replace(/\D+/g, ''))
    if (number < 30000) {
      fail('There is few results (fewer than 6660) ')
    }
    console.log(`Количество результатов: ${number}`)
  })

  it('Relevance of results Test', async function f () {
    let values = await driver.findElements(By.xpath('//div[@id=\'search\']//h3'))
    values.forEach(async function (element) {
      let result = await element.getText()
      expect(result.includes('iTechArt')).toBeTruthy()
    })
  })
})
