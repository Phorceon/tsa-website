import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 }
  });
  
  await page.goto('http://localhost:3001/');
  await page.waitForTimeout(1000);

  // Scroll in steps and take screenshots
  for (let i = 0; i < 4; i++) {
    await page.screenshot({ path: `/Users/aditya/Documents/tsa site/tsa-website/debug-snap-${i}.png` });
    // Scroll down significantly
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(300);
  }
  
  await browser.close();
})();
