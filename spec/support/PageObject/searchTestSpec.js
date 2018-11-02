let GoogleSearchPage = require('./GoogleSearchPage.js');
let webdriver = require('selenium-webdriver');

describe('Test with Page Object', function () {
    let driver;
    let googlePage;

    beforeAll(function () {
        driver = new webdriver.Builder().forBrowser('chrome').build();
        googlePage = new GoogleSearchPage(driver);
    });

    afterAll(async function () {
        await driver.quit();
    });

    it('Search Test', async function () {
        googlePage.open();
        await googlePage.search('iTechArt');
        let number = googlePage.getQuantityOfSearchResults();
        console.log(`There is about  ${number} results.`);
        let results = googlePage.getSearchResults();
        results.forEach(async function (element) {
            let result = await element.getText();
            expect(result.includes("iTechArt")).toBeTruthy();
        });
    })
});