let webdriver = require('selenium-webdriver')
let BasePage = require('../PageObject/BasePage.js')

class GoogleSearchResultsPage extends BasePage {

  constructor (driver) {
    super(driver)
    this.resultStats = webdriver.By.id('resultStats')
    this.searchResults = webdriver.By.xpath('//div[@id=\'search\']//a/h3')
    this.nextPageLink = webdriver.By.className('pn')
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
    for(let i = 0; i < results.length; i++) {
      values.push( await results[i].getText())
    }
    return values
  };

  async navigateToNextPage () {
    this.url = await this.driver.getDriver().findElement(this.nextPageLink).getAttribute('href')
    return this.open()
  }

}

module.exports = GoogleSearchResultsPage