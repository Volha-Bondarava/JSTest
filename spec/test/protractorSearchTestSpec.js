let using = require('jasmine-data-provider')
let provider = require('../properties/data.json')
let googlePage = require('../pageObject/protractor/googleSearchPage.js')
let resultsPage = require('../pageObject/protractor/googleSearchResultsPage.js')

describe('Search results page', function () {

  using(provider, function (data) {
    it('should have expected number of results', async function () {
      googlePage.get()
      googlePage.typeSearchQuery(data.query)
      let number = await resultsPage.getNumberOfSearchResults()
      expect(number).toBeGreaterThanOrEqual(data.numberOfResults)
      console.log(`Query: ${data.query}. There is about ${number.toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 ')} results.`)
    })

    it('should have relevant results', async function () {
      let results = await resultsPage.getSearchResultsHeads()
      results.forEach(function (result) {
        let reg = RegExp(data.regex)
        expect(reg.test(result)).toBeTruthy(`Actual: ${result}, expected: ${data.query}`)
      })
    })
  })
})