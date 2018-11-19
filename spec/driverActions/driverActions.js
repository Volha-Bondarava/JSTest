const {until, Key} = require('selenium-webdriver')

class DriverActions {

  constructor (driver) {
    this.driver = driver
  }

  getDriver () {
    return this.driver
  }

  async openPage (url) {
    return await this.driver.get(url)
  }

  async quitDriver () {
    return await this.driver.quit()
  }

  async waitForElementLocated (locator, timeout = 15000) {
    return await this.driver.wait(until.elementLocated(locator), timeout, `Can't locate element ${locator}`)
  }

  async find (locator) {
    return await this.driver.findElement(locator)
  }

  async finds (locator) {
    return await this.driver.findElements(locator)
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

}

module.exports = DriverActions