const {browser, element, by} = require('protractor')
const {Key} = require('selenium-webdriver')

let googleSearchPage = function () {
  this.url = 'http://google.by'
  let searchField = element(by.name('q'))

  this.get = function () {
    browser.waitForAngularEnabled(false)
    browser.get(this.url)
  }

  this.typeSearchQuery = function (text) {
    searchField.sendKeys(text)
    searchField.sendKeys(Key.RETURN)
  }
}

module.exports = new googleSearchPage()
