const {element, by} = require('protractor')

let googleSearchResultsPage = function () {
  let resultStats = element(by.id('resultStats'))
  let searchResults = element.all(by.xpath('//div[@id=\'search\']//a/h3'))

  this.getNumberOfSearchResults = async function () {
    let text = await resultStats.getText()
    let time = await resultStats.element(by.tagName('nobr')).getText()
    text = text.replace(time, '').replace(/\D+/g, '')
    return parseInt(text)
  }

  this.getSearchResultsHeads = async function () {
    await searchResults.map(async function (result) {
      return await result.getText()
    })
    return searchResults
  }
}

module.exports = new googleSearchResultsPage()
