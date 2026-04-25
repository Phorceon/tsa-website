import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: '/Users/aditya/.gemini/antigravity/brain/e5c5d118-66b2-45a5-a914-6c9710a00824/playwright-vids/'
    },
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();
  
  await page.goto('http://localhost:3001/');
  await page.waitForTimeout(1000);

  // Slowly scroll down the page to trigger the scrolltelling
  for (let i = 0; i < 50; i++) {
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(100);
  }
  
  await browser.close();
  console.log('Video captured successfully.');
})();
