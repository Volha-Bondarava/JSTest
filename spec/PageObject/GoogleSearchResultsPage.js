let webdriver = require('selenium-webdriver')
let BasePage = require('../PageObject/BasePage.js')

class GoogleSearchResultsPage extends BasePage {

  constructor (driver) {
    super(driver)
    this.resultStats = webdriver.By.id('resultStats')
    this.searchResults = webdriver.By.xpath('//div[@id=\'search\']//a/h3')
  };

  async getQuantityOfSearchResults () {
    await this.driver.waitForElementLocated(this.resultStats)
    let text = await this.driver.getElementText(this.resultStats)
    text = text.substring(0, text.length - 11)
    return parseInt(text.replace(/\D+/g, ''))
  };

  async getSearchResults () {
    let values = []
    let results = await this.driver.getDriver().findElements(this.searchResults)
    await Promise.all(results.map(async result => {
      values.push(await result.getText())
    }))
    return values
  };

}

module.exports = GoogleSearchResultsPage