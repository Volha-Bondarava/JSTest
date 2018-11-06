let GoogleSearchPage = require('../PageObject/GoogleSearchPage.js');
require('chromedriver');
let webdriver = require('selenium-webdriver');

describe('Test with Page Object', function () {
    let driver;
    let googlePage;

    beforeAll(async function () {
        driver = await new webdriver.Builder().forBrowser('chrome').build();
        googlePage = new GoogleSearchPage(driver);
    });

    afterAll(async function () {
        await driver.quit();
    });

    it('Search Test', async function () {
        await googlePage.open();
        await googlePage.typeSearchQuery('iTechArt');
        await googlePage.clickSearchButton();
        let number = await googlePage.getQuantityOfSearchResults();
        console.log(`There is about ${number} results.`);
        let results = await googlePage.getSearchResults();
        results.forEach(async function (element) {
            let result = await element.getText();
            expect(result.includes("iTechArt")).toBeTruthy();
        });
    })
});