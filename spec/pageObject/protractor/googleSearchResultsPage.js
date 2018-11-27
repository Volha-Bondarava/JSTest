const {browser, element, by} = require('protractor')

let googleSearchResultsPage = function () {
  let resultStats = element(by.id('resultStats'))
  let searchResults = element.all(by.xpath('//div[@id=\'search\']//a/h3'))

  this.getNumberOfSearchResults = async function () {
    let text = await resultStats.getText()
    text = text.substring(0, text.length - 11)
    return parseInt(text.replace(/\D+/g, ''))
  }

  this.getSearchResultsHeads = async function () {
    await searchResults.map(async function(result) {
      return await result.getText()
    })
    return searchResults
  }
}

module.exports = new googleSearchResultsPage()
