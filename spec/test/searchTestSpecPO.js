let using = require('jasmine-data-provider')
let configuration = require('../support/jasmine')
let language = require('../properties/translation/lang')
let path = '../properties/translation/*.json'
let provider = require('../properties/data.json')
let mailData = require('../properties/mail.json')
let googleSearchPage = require('../pageObject/googleSearchPage.js')
let googleSearchResultsPage = require('../pageObject/googleSearchResultsPage.js')
let googleLoginPage = require('../pageObject/googleMail/googleLoginPage.js')
let googleMailboxPage = require('../pageObject/googleMail/googleMailboxPage.js')
let googleTranslatePage = require('../pageObject/googleTranslatePage')

describe('Test with Page Object', function () {
  let driver

  beforeAll(async function () {
    driver = await configuration.before()
  })

  afterAll(async function () {
    await configuration.after(driver)
  })

  xdescribe('Search', function () {
    let googleBasePage, googleResultsPage

    using(provider, function (data) {
      it('Results quantity Test', async function () {
        googleBasePage = new googleSearchPage(driver)

        await googleBasePage.open()
        await googleBasePage.searchQuery(data.query)

        googleResultsPage = new googleSearchResultsPage(googleBasePage.getDriver())

        let number = await googleResultsPage.getQuantityOfSearchResults()
        await expect(number).toBeGreaterThan(data.resultsNumber)
        console.log(`Query: ${data.query}. There is about ${number} results.`)
      })

      it('Relevance of results Test', async function () {
        let results = await googleResultsPage.getSearchResults()
        await expect(results.length).toBeGreaterThan(0)
        results.forEach(function (result) {
          let reg = RegExp(data.regexp)
          expect(reg.test(result)).toBeTruthy(`act: ${result}, exp: ${data.query}`)
        })

        await googleResultsPage.navigateToNextPage()
        results = await googleResultsPage.getSearchResults()
        await expect(results.length).toBeGreaterThan(0)
        results.forEach(function (result) {
          let reg = RegExp(data.regexp)
          expect(reg.test(result)).toBeTruthy(`act: ${result}, exp: ${data.query}`)
        })
      })
    })
  })

  xdescribe('Google Mail', function () {
    let googleLogin, googleMailbox

    it('mailBox should open', async function () {
      googleLogin = new googleLoginPage(driver)
      await googleLogin.openLoginPage()
      await googleLogin.typeLogin(mailData.login)
      await googleLogin.typePassword(mailData.password)
      await googleLogin.openMailbox()
      googleMailbox = await new googleMailboxPage(googleLogin.getDriver())
      let sender = await googleMailbox.findMessage('Ha-ha-ha')
      console.log(`Sender of message is ${sender}`)
    })
  })

  describe('Google Translate', function () {
    let translatePage

    using(language, function (lang) {
      it('should translate properly', async function () {
        translatePage = new googleTranslatePage(driver)
        await translatePage.open()
        let dictionary = require(path.replace('*', lang.from))
        for (let i = 0; i < dictionary.length; i++) {
          await translatePage.chooseLangs(lang.fao, lang.tao)
          await translatePage.typeWordAndSubmit(dictionary[i].from)
          expect(translatePage.getTranslation()).toEqual(dictionary[i].to)
        }
      })
    })
  })
})