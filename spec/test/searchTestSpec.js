"use strict"

let using = require('jasmine-data-provider')
let configuration = require('../support/jasmine')
let provider = require('../properties/data.json')
const {Key, By, until} = require('selenium-webdriver')
const {describe, it} = require('jasmine')

describe('Google Search test without Page Object', function () {
  let driver

  let url = 'http://google.by'
  let searchFieldName = 'q'
  let resultStatsId = 'resultStats'
  let searchResultsXpath = '//div[@id=\'search\']//a/h3'

  beforeAll(async function () {
    driver = await configuration.before()
  })

  afterAll(async function () {
    await configuration.after(driver)
  })

  using(provider, function (data) {
    it('should have expected quantity of results', async function () {
      await driver.get(url)
      await driver.wait(until.elementLocated(By.name(searchFieldName)), 15000)
      await driver.findElement(By.name(searchFieldName)).sendKeys(data.query, Key.RETURN)
      await driver.wait(until.elementLocated(By.id(resultStatsId)), 15000)

      let text = await driver.findElement(By.id(resultStatsId)).getText()
      text = text.substring(0, text.length - 11)
      let number = parseInt(text.replace(/\D+/g, ''))
      await expect(number).toBeGreaterThan(data.numberOfResults)
      console.log(`Запрос: ${data.query}. Количество результатов: ${number.toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 ')}`)
    })

    it('should have relevant results', async function () {
      let values = await driver.findElements(By.xpath(searchResultsXpath))

      values.forEach(async function (element) {
        let result = await element.getText()
        let reg = RegExp(data.regexp)
        await expect(reg.test(result)).toBeTruthy(`Actual: ${result}, expected: ${data.query}`)
      })
    })

  })

})
