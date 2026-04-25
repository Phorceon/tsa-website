const { chromium } = require('playwright');

async function run() {
  // Launch in non-headless mode so the user can see it LIVE!
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  
  const pagesToTest = [
    '/programs',
    '/events',
    '/volunteer'
  ];

  for (const pagePath of pagesToTest) {
    const page = await context.newPage();
    const url = `http://localhost:3001${pagePath}`;
    console.log(`Live verifying ${url}...`);
    
    try {
      await page.goto(url, { waitUntil: 'load' });
      
      // Wait a moment for things to settle
      await page.waitForTimeout(1000);
      
      console.log(`Scrolling ${pagePath} to demonstrte smooth scrollytelling...`);
      // Scroll down slowly in small increments to show the parallax beautifully
      for (let i = 0; i < 20; i++) {
        await page.evaluate(() => window.scrollBy({ top: 30, behavior: 'instant' }));
        await page.waitForTimeout(100);
      }
      
      for (let i = 0; i < 20; i++) {
        await page.evaluate(() => window.scrollBy({ top: 30, behavior: 'instant' }));
        await page.waitForTimeout(100);
      }

      await page.waitForTimeout(1000);

      // Scroll back up to demonstrate again
      console.log(`Scrolling back up ${pagePath}...`);
      for (let i = 0; i < 20; i++) {
        await page.evaluate(() => window.scrollBy({ top: -60, behavior: 'instant' }));
        await page.waitForTimeout(100);
      }
      
      await page.waitForTimeout(1500);
    } catch (e) {
      console.error(`Failed to load ${url}, the server might be on port 3000. Error:`, e.message);
    }
    await page.close();
  }

  await browser.close();
  console.log('Live Verification Complete!');
}

run();
