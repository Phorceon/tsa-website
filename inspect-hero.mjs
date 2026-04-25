import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  
  // Force reload to pick up latest Vite changes
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000); // Wait for WebGL to initialize

  await page.screenshot({ path: '/tmp/hero-0.png' });
  console.log('Saved hero-0.png');

  await page.mouse.wheel(0, 1200);
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/hero-1.png' });
  console.log('Saved hero-1.png');

  await page.mouse.wheel(0, 1200);
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/hero-2.png' });
  console.log('Saved hero-2.png');

  await page.mouse.wheel(0, 1200);
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/hero-3.png' });
  console.log('Saved hero-3.png');

  await browser.close();
})();
