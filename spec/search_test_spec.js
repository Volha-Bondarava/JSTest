const {Key, By, until} = require('selenium-webdriver');
let webdriver = require('selenium-webdriver');

describe("test", function () {
    let driver;
    beforeAll(function () {
        driver = new webdriver.Builder().forBrowser("chrome").build();
    });

    it('Google Search', async function (done) {
        driver.get('http://google.by');
        await driver.findElement(By.name('q')).sendKeys('iTechArt', Key.RETURN);
        driver.wait(until.titleIs('iTechArt - Пошук Google'), 1000);
        /*let text = await driver.findElement(By.id('resultStats')).getText();
        done();
        text = text.substring(0, text.length - 11);
        console.log(text);
        let number = parseInt(text.replace(/\D+/g, ""));
        console.log("Количесвто результатов: " + number);*/
        /*let results = driver.findElements(By.className('g'));
        let isOk = false;
        for (let i = 0; i < results.length; i++) {
            isOk = results[i].contains("iTechArt");
            console.log(results[i]);
        }
        expect(isOk).toBe(true);*/
    });

    it("Result's quantity", function () {
        let text = driver.findElement(By.id('resultStats')).getText();
        text = text.substring(0, text.length - 11);
        console.log(text);
        let number = parseInt(text.replace(/\D+/g, ""));
        console.log("Количесвто результатов: " + number);
    });

    it("Relevant result", function () {
        let results = driver.findElements(By.className('g'));
        let isOk = false;
        for (let i = 0; i < results.length; i++) {
            isOk = results[i].contains("iTechArt");
            console.log(results[i]);
        }
        expect(isOk).toBe(true);
    });

    afterAll(async function () {
        await driver.quit();
    });
});