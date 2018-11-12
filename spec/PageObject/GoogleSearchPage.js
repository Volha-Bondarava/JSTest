const {until, Key} = require('selenium-webdriver')
let webdriver = require('selenium-webdriver')

class GoogleSearchPage {

  constructor (driver) {
    this.driver = driver
    this.url = 'http://google.by'
    this.searchField = webdriver.By.name('q')
    this.resultStats = webdriver.By.id('resultStats')
    this.searchResults = webdriver.By.xpath('//div[@id=\'search\']//a/h3')
  };

  async open () {
    await this.driver.get(this.url)
    return await this.driver.wait(until.elementLocated(this.searchField), 15000, 'Can\'t locate search field after opening google.by')
  };

  async searchQuery (text) {
    return await this.driver.findElement(this.searchField).sendKeys(text, Key.RETURN)
  };

  async getQuantityOfSearchResults () {
    await this.driver.wait(until.elementLocated(this.resultStats), 15000)
    let text = await this.driver.findElement(this.resultStats).getText()
    text = text.substring(0, text.length - 11)
    return parseInt(text.replace(/\D+/g, ''))
  };

  async getSearchResults () {
    let values = []
    let results = await this.driver.findElements(this.searchResults)
    await Promise.all(results.map(async result => {
      let value = await result.getText()
      values.push(value)
    }))
    return values
  };

  async quitDriver () {
    await this.driver.quit()
  };
}

module.exports = GoogleSearchPage