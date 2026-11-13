/**
 * Screenshot + layout QA automation.
 *
 * Captures every section of every page at multiple viewport widths and
 * reports horizontal overflow so nothing breaks on any screen size.
 *
 * Usage:
 *   npm run build && npm run preview   (serve ./dist on :4321)
 *   npm run screenshots
 *
 * Output:
 *   screenshots/<route>/<width>.png        full-page capture
 *   screenshots/<route>/<width>_sNN.png    per-section capture
 *   screenshots/report.json                overflow / QA report
 */

import { chromium } from 'playwright';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const BASE = process.env.BASE_URL || 'http://localhost:4321';
const ROUTES = [
  '', 'works', 'team', 'gep', 'contact', 'legal-notice', 'privacy-policy', 'cookies-policy', 'accessibility',
  'es', 'es/works', 'es/team', 'es/gep', 'es/contact', 'es/legal-notice', 'es/privacy-policy', 'es/cookies-policy', 'es/accessibility',
];
const WIDTHS = [320, 375, 414, 768, 1024, 1280, 1536, 1920];
const SHOT_ROOT = 'screenshots';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function launchBrowser() {
  for (const channel of ['msedge', 'chrome', undefined]) {
    try {
      const browser = await chromium.launch(channel ? { channel } : {});
      console.log(`Browser launched: ${channel || 'bundled chromium'}`);
      return browser;
    } catch {
      /* try next */
    }
  }
  throw new Error('No Chromium found. Run: npx playwright install chromium');
}

async function main() {
  rmSync(SHOT_ROOT, { recursive: true, force: true });
  mkdirSync(SHOT_ROOT, { recursive: true });

  const browser = await launchBrowser();
  const problems = [];
  const stats = { pages: 0, shots: 0 };

  for (const route of ROUTES) {
    const name = route || 'home';
    const dir = join(SHOT_ROOT, name);
    mkdirSync(dir, { recursive: true });

    for (const width of WIDTHS) {
      const ctx = await browser.newContext({
        viewport: { width, height: Math.min(1600, Math.round(width * 1.7)) },
        deviceScaleFactor: 1,
        reducedMotion: 'no-preference',
      });
      const page = await ctx.newPage();
      stats.pages++;

      try {
        await page.goto(`${BASE}/${route}`, { waitUntil: 'networkidle', timeout: 30000 });
      } catch {
        await page.goto(`${BASE}/${route}`, { waitUntil: 'load', timeout: 30000 });
      }
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => {
        document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
      });
      await sleep(120);

      // 1) Full-page capture
      await page.screenshot({ path: join(dir, `${width}.png`), fullPage: true });
      stats.shots++;

      // 2) Per-section captures
      const sections = await page.$$eval('main > section, footer', (els) =>
        els.map((el) => {
          const r = el.getBoundingClientRect();
          const heading = el.querySelector('h1, h2, h3, p');
          return {
            index: null,
            top: r.top,
            height: r.height,
            label: (heading ? heading.textContent.trim().slice(0, 40) : el.tagName.toLowerCase()).replace(/[^\w-]+/g, '_').toLowerCase() || 'section',
          };
        })
      );
      for (let i = 0; i < sections.length; i++) {
        const el = (await page.$$('main > section, footer'))[i];
        if (sections[i].height < 60) continue;
        await el.screenshot({ path: join(dir, `${width}_s${String(i + 1).padStart(2, '0')}_${sections[i].label}.png`) });
        stats.shots++;
      }

      // 3) Overflow / QA detection
      const qa = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const bad = [];
        document.querySelectorAll('body *').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && (r.right > vw + 1 || r.left < -1)) {
            const cs = getComputedStyle(el);
            if (cs.position === 'fixed' || cs.overflowX === 'hidden' || el.closest('svg')) return;
            const cls = typeof el.className === 'string' ? el.className : '';
            if (cls.includes('skip-link')) return; // intencionalmente fuera de pantalla
            bad.push({ tag: el.tagName.toLowerCase(), cls: cls.split(' ')[0] || '', left: Math.round(r.left), right: Math.round(r.right), vw });
          }
        });
        const pageScroll = document.documentElement.scrollWidth > document.documentElement.clientWidth;
        return { pageScroll, bad: bad.slice(0, 12) };
      });

      if (qa.pageScroll || qa.bad.length) {
        problems.push({ route: name, width, pageScroll: qa.pageScroll, elements: qa.bad });
      }

      await ctx.close();
    }
    console.log(`✓ ${name} — ${WIDTHS.length} widths captured`);
  }

  await browser.close();
  writeFileSync(join(SHOT_ROOT, 'report.json'), JSON.stringify({ problems }, null, 2));

  console.log(`\nDone: ${stats.pages} page-loads, ${stats.shots} screenshots → ${SHOT_ROOT}/`);
  if (problems.length) {
    console.log(`\n⚠ OVERFLOW ISSUES (${problems.length}):`);
    console.log(JSON.stringify(problems, null, 2));
    process.exitCode = 1;
  } else {
    console.log('✓ No overflow issues at any viewport width.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
