const {Key, By, until} = require('selenium-webdriver');
let webdriver = require('selenium-webdriver');

describe("test", function () {
    let driver;

    beforeAll(async function () {
        driver = await new webdriver.Builder().forBrowser("chrome").build();
    });

    afterAll(async function () {
        await driver.quit();
    });

    it('Google Search', async function () {
        driver.get('http://google.by');
        await driver.findElement(By.name('q')).sendKeys('iTechArt', Key.RETURN);
        driver.wait(until.titleIs('iTechArt - Пошук Google'), 5000);

        let text = await driver.findElement(By.id('resultStats')).getText();
        text = text.substring(0, text.length - 11);
        let number = parseInt(text.replace(/\D+/g, ""));
        console.log("Количество результатов: " + number);

        let values = await driver.findElements(By.xpath("//h3"));
        values.forEach(async function (element) {
            let result = await element.getText();
            expect(result.includes("iTechArt")).toBeTruthy();
        });
    });
});
