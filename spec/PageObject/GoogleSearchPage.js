const {By, until} = require('selenium-webdriver')
let webdriver = require('selenium-webdriver')

class GoogleSearchPage {

  constructor (driver) {
    this.driver = driver
    this.url = 'http://google.by'
    this.searchField = webdriver.By.name('q')
    this.resultStats = webdriver.By.id('resultStats')
    this.searchResults = webdriver.By.xpath('//div[@id=\'search\']//h3')
    this.searchButton = webdriver.By.name('btnK')
  };

  open () {
    return this.driver.get(this.url)
  };

  typeSearchQuery (text) {
    return this.driver.findElement(this.searchField).sendKeys(text)
  };

  async clickSearchButton () {
    await this.driver.findElement(this.searchButton).click()
    return this.driver.wait(until.titleIs('iTechArt - Пошук Google'))
  };

  async getQuantityOfSearchResults () {
    let text = await this.driver.findElement(By.id('resultStats')).getText()
    text = text.substring(0, text.length - 11)
    return parseInt(text.replace(/\D+/g, ''))
  };

  async getSearchResults () {
    let results = []
    results = await this.driver.findElements(this.searchResults)
    return results
  };
}

module.exports = GoogleSearchPage