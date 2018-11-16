const {until, Key} = require('selenium-webdriver')

class DriverActions {

  constructor (driver) {
    this.driver = driver
  }

  getDriver () {
    return this.driver
  }

  async waitForElementLocated (locator, timeout = 15000) {
    return await this.driver.wait(until.elementLocated(locator), timeout, `Can't locate element ${locator}`)
  }

  async openPage (url) {
    return await this.driver.get(url)
  }

  async quitDriver () {
    return await this.driver.quit()
  }

  async getElementText (locator) {
    return await this.driver.findElement(locator).getText()
  }

  async typeAndSubmit (locator, text) {
    return await this.driver.findElement(locator).sendKeys(text, Key.RETURN)
  }

  async find (locator) {
    return await this.driver.findElement(locator)
  }

  async finds (locator) {
    return await this.driver.findElements(locator)
  }

  async getElementHref (locator) {
    return await this.driver.findElement(locator).getAttribute('href')
  }

}

module.exports = DriverActions