const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  
  const pagesToTest = ['/programs', '/events', '/volunteer'];
  let allTestsPassed = true;

  for (const pagePath of pagesToTest) {
    const page = await context.newPage();
    const url = `http://localhost:3001${pagePath}`;
    console.log(`\n--- Evaluating DOM Parallax on ${pagePath} ---`);
    
    try {
      await page.goto(url, { waitUntil: 'load' });
      await page.waitForTimeout(500);

      const getHeroStyles = async () => {
        return await page.evaluate(() => {
          // Find the motion.section that has the parallax applied!
          const heroSection = document.querySelector('#main-content').firstElementChild;
          if (!heroSection) return null;
          const computed = window.getComputedStyle(heroSection);
          return {
            opacity: parseFloat(computed.opacity),
            transform: computed.transform
          };
        });
      };

      const startState = await getHeroStyles();
      console.log(`Initial State (Scroll 0):`, startState);

      // Scroll down by 200px
      await page.evaluate(() => window.scrollTo({ top: 200, behavior: 'instant' }));
      await page.waitForTimeout(200);
      const midState = await getHeroStyles();
      console.log(`Mid State (Scroll 200):`, midState);

      // Scroll down by 400px
      await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }));
      await page.waitForTimeout(200);
      const endState = await getHeroStyles();
      console.log(`End State (Scroll 400):`, endState);

      // Programmatic Verification
      if (!startState || !midState || !endState) {
        console.error(`❌ Failed to find the animated elements on ${pagePath}`);
        allTestsPassed = false;
        continue;
      }

      // 1. The opacity should strictly decrease
      const isOpacityFading = startState.opacity === 1 && midState.opacity < 1 && endState.opacity < midState.opacity;
      
      // 2. The transform Y coordinate (parallax) should increase downwards (matrix values change)
      const parseY = (transformStr) => {
        if (transformStr === 'none') return 0;
        const match = transformStr.match(/matrix.*\((.+)\)/);
        if (match) {
          const parts = match[1].split(', ');
          return parseFloat(parts[5]); // matrix(a, b, c, d, tx, ty) -> ty is index 5
        }
        return 0;
      };

      const yStart = parseY(startState.transform);
      const yMid = parseY(midState.transform);
      const yEnd = parseY(endState.transform);
      const isYTransforming = yMid > yStart && yEnd > yMid;

      if (isOpacityFading && isYTransforming) {
        console.log(`✅ Success! ${pagePath} parallax effect is smoothly transforming.`);
      } else {
        console.error(`❌ Validation Failed on ${pagePath}!`);
        console.log(`   Opacity Fading: ${isOpacityFading} | yStart: ${yStart}, yMid: ${yMid}, yEnd: ${yEnd}`);
        allTestsPassed = false;
      }

    } catch (e) {
      console.error(`Error loading ${url}:`, e.message);
      allTestsPassed = false;
    }
    await page.close();
  }

  await browser.close();
  console.log(`\nFinal Verdict: ${allTestsPassed ? 'ALL PAGES WORKING SMOOTHLY ✅' : 'SOME PAGES FAILED ❌'}`);
}

run();
