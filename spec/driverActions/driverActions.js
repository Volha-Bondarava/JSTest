const {until, Key} = require('selenium-webdriver')

class driverActions {

  constructor (driver) {
    this.driver = driver
  }

  async openPage (url) {
    return await this.driver.get(url)
  }

  async waitForElementLocated (locator, timeout = 15000) {
    return await this.driver.wait(until.elementLocated(locator), timeout, `Can't locate element ${locator}`)
  }

  async waitElementIsVisible (locator, timeout = 15000) {
    let element = await this.driver.findElement(locator)
    return await this.driver.wait(until.elementIsVisible(element), timeout, `Element ${element} is not visible`)
  }

  async find (locator) {
    return await this.driver.findElement(locator)
  }

  async finds (locator) {
    return await this.driver.findElements(locator)
  }

  async click (locator) {
    return await this.driver.findElement(locator).click()
  }

  async type (locator, text) {
    return await this.driver.findElement(locator).sendKeys(text)
  }

  async typeAndSubmit (locator, text) {
    return await this.driver.findElement(locator).sendKeys(text, Key.RETURN)
  }

  async getElementText (locator) {
    return await this.driver.findElement(locator).getText()
  }

  async getElementHref (locator) {
    return await this.driver.findElement(locator).getAttribute('href')
  }

  async getElementAttribute (locator, attribute) {
    return await this.driver.findElement(locator).getAttribute(attribute)
  }

}

module.exports = driverActions