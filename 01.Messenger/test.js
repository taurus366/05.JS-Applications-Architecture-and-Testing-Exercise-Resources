const {expect, assert} = require('chai')
const {chromium} = require('playwright-chromium');
// const {} = require('mocha');
let browser, page;

describe('E2E tests', function () {
    this.timeout(60000)
    before(async () => {
        browser = await chromium.launch({headless: false, slowMo: 600})
    });
    after(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        page = await browser.newPage();
    });
    afterEach(async () => {
        await page.close();
    });

    it('Testing: load messages', async () => {
        await page.goto('http://localhost:3000/');
        await page.click('text=Refresh');

        const text = await page.$$eval("#messages", (arr) => arr.map(x => x.value));
        expect(text.join('\n')).to.equal('Spami: Hello, are you there?\n' +
            'Garry: Yep, whats up :?\n' +
            'Spami: How are you? Long time no see? :)\n' +
            'George: Hello, guys! :))\n' +
            'Spami: Hello, George nice to see you! :)))')
    });

    it.only('Testing: send message', async () => {
        await page.goto('http://localhost:3000/');
        await Promise.all([
            await page.fill('#author', 'Niko'),
            await page.fill('#content', 'Hello from Mocha !'),

        ])
         await page.click('text=Send')
    });

});

// (async () => {
//     const browser = await chromium.launch({headless:false,slowMo:500});
//     const page = await browser.newPage();
//     await page.goto('http://whatsmyuseragent.org/');
//     await page.screenshot({ path: `example23.png` });
//     await browser.close();
// })();
