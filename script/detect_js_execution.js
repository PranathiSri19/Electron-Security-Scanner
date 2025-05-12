const puppeteer = require('puppeteer');

async function detectSuspiciousJS(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    let result = { suspiciousJS: false };

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        const suspicious = await page.evaluate(() => {
            return Array.from(document.scripts).some(script => script.innerText.includes("eval("));
        });

        result.suspiciousJS = suspicious;
    } catch (error) {
        result.error = error.message;
    } finally {
        await browser.close();
        console.log(JSON.stringify(result));
    }
}

const url = process.argv[2];
if (url) detectSuspiciousJS(url);
