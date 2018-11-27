'use strict'

let basePage = require('../basePage.js')
let webdriver = require('selenium-webdriver')

class googleMailboxPage extends basePage {
  constructor (driver) {
    super(driver)
    this.searchMailField = webdriver.By.xpath('//*[@aria-label=\'Search mail\']')
    this.senderInfo = webdriver.By.xpath('//div[@role=\'main\']//table/tbody/tr/td[5]//span[@email]')
  }

  async findMessage (messageText) {
    await this.driver.typeAndSubmit(this.searchMailField, messageText)
    await this.driver.waitForPageLoad()
    let sender = await this.driver.getElementAttribute(this.senderInfo, 'email')
    return sender
  }
}

module.exports = googleMailboxPage