const {By, until} = require('selenium-webdriver')
let webdriver = require('selenium-webdriver')

class GoogleSearchPage {

  constructor (driver) {
    this.driver = driver
    this.url = 'http://google.by'
    this.searchField = webdriver.By.name('q')
    this.resultStats = webdriver.By.id('resultStats')
    this.searchResults = webdriver.By.xpath('//div[@id=\'search\']//a/h3')
    this.searchButton = webdriver.By.name('btnK')
  };

  async open () {
    this.driver.get(this.url)
    return await this.driver.wait(until.elementLocated(this.searchField), 10000)
  };

  typeSearchQuery (text) {
    return this.driver.findElement(this.searchField).sendKeys(text)
  };

  async clickSearchButton () {
    await this.driver.findElement(this.searchButton).click()
    return await this.driver.wait(until.elementLocated(this.resultStats), 10000)
  };

  async getQuantityOfSearchResults () {
    let text = await this.driver.findElement(this.resultStats).getText()
    text = text.substring(0, text.length - 11)
    return parseInt(text.replace(/\D+/g, ''))
  };

  async getSearchResults () {
    let results = []
    results = await this.driver.findElements(this.searchResults)
    return results
  };

  async quitDriver () {
    await this.driver.quit()
  }
}

module.exports = GoogleSearchPage