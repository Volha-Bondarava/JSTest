require('chromedriver')
let webdriver = require('selenium-webdriver')
let googleLoginPage = require('../pageObject/googleMail/googleLoginPage.js')
let googleMailboxPage = require('../pageObject/googleMail/googleMailboxPage.js')
let mailData = require('../properties/mail.json')

describe('Google Login Test', function () {
  let googleLogin, googleMailbox

  beforeAll(async function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000
    let driver = await new webdriver.Builder().forBrowser('chrome').build()
    await driver.manage().setTimeouts({implicit: 15000, pageLoad: 15000})
    googleLogin = new googleLoginPage(driver)
  })

  afterAll(async function () {
    await googleMailbox.close()
  })

  it('should mailBox open', async function () {
    await googleLogin.openLoginPage()
    await googleLogin.typeLogin(mailData.login)
    await googleLogin.typePassword(mailData.password)
    await googleLogin.openMailbox()
    googleMailbox = await new googleMailboxPage(googleLogin.getDriver())
    let sender = await googleMailbox.findMessage('Ha-ha-ha')
    console.log(`Sender of message is ${sender}`)
  })
})