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

  async typeText (locator, text) {
    return await this.driver.findElement(locator).sendKeys(text)
  }

  async typeAndSubmit (locator, text) {
    return await this.driver.findElement(locator).sendKeys(text, Key.RETURN)
  }

  async click (locator) {
    return await this.driver.findElement(locator).click()
  }

  static async getElementByXpath (driver, xpath) {
    return await driver.findElement(By.xpath(xpath))
  }

  static async getElementById (driver, id) {
    return await driver.findElement(By.id(id))
  }

  static async getElementByName (driver, name) {
    return await driver.findElement(By.name(name))
  }

  static async getElement(driver, locator) {
    return await driver.findElement(locator)
  }
}

module.exports = DriverActions