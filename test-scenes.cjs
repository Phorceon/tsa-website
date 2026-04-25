const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const pages = ['/events', '/programs', '/resources', '/mental-health', '/volunteer', '/references'];
  
  for (const path of pages) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', err => errors.push(err.message));
    
    await page.goto(`http://localhost:3001${path}`, { waitUntil: 'load', timeout: 15000 });
    await page.waitForTimeout(2500); // let Three.js/GSAP init
    
    // Check the canvas rendered something (3D loaded)
    const canvasExists = await page.$('canvas') !== null;
    
    const webglErrors = errors.filter(e => !e.includes('Download the React DevTools'));
    console.log(`${path}: canvas=${canvasExists} | errors=${webglErrors.length > 0 ? webglErrors.join('; ') : 'none'}`);
    
    await page.screenshot({ path: `screenshots${path.replace('/', '-')}.png` });
    await page.close();
  }
  
  await browser.close();
  console.log('Done — check screenshots for visual result');
}

run();
