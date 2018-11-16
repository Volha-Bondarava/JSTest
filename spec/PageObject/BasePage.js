let driverActions = require('../driverActions/DriverActions')

class BasePage {

  constructor (driver, url) {
    this.driver = new driverActions(driver)
    this.url = url
  }

  async open () {
    return await this.driver.openPage(this.url)
  }

  async close () {
    return await this.driver.quitDriver()
  }
}

module.exports = BasePage