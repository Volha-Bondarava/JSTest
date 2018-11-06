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

  it('Search Test', async function () {
    setTimeout(async function () {
      await driver.get('http://google.by')
    }, 9000)

    await driver.findElement(By.name('q')).sendKeys('iTechArt', Key.RETURN)
    await driver.wait(until.titleIs('iTechArt - Пошук Google'))

    let text = await driver.findElement(By.id('resultStats')).getText()
    text = text.substring(0, text.length - 11)
    let number = parseInt(text.replace(/\D+/g, ''))
    console.log(`Количество результатов: ${number}`)

    let values = await driver.findElements(By.xpath('//div[@id=\'search\']//h3'))
    values.forEach(async function (element) {
      let result = await element.getText()
      expect(result.includes('iTechArt')).toBeTruthy()
    })
  })
})
