const {browser, element, by, protractor} = require('protractor')

let googleSearchPage = function () {
  this.url = 'http://google.by'
  let searchField = element(by.name('q'))

  this.get = function () {
    browser.waitForAngularEnabled(false)
    browser.get(this.url)
  }

  this.typeSearchQuery = function (text) {
    searchField.sendKeys(text)
    searchField.sendKeys(protractor.Key.RETURN)
  }
}

module.exports = new googleSearchPage()
