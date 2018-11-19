let driverActions = require('../driverActions/driverActions')

class BasePage {

  constructor (driver, url = '') {
    this.driver = new driverActions(driver)
    this.url = url
  }

  async open () {
    return await this.driver.openPage(this.url)
  }

  async close() {
    return this.driver.driver.quit()
  }

  getDriver() {
    return this.driver.driver
  }
}

module.exports = BasePage