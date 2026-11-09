/* global process, console */
// Headless driver for the form builder. Usage (from repo root):
//   node .claude/skills/run-svelte-form-builder/driver.mjs [--url URL] [cmd ...]
// Each cmd is one quoted string. No cmds = smoke flow. See SKILL.md for the list.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { iconJson, ICONIFY_HOSTS } from './icon-stub.mjs';

const args = process.argv.slice(2);
let url = 'http://localhost:5173';
if (args[0] === '--url') url = args.splice(0, 2)[1];
const cmds = args.length
	? args
	: [
			'drop title',
			'drop input',
			'drop radio',
			'select 1',
			'shot editor',
			'click Preview',
			'shot preview',
			'click Edit',
			'click JSON',
			'shot json',
			'json'
		];

const outDir = process.env.SHOTS_DIR || '/tmp/sfb-shots';
mkdirSync(outDir, { recursive: true });

// CHROMIUM_PATH: use a preinstalled Chromium when the project's Playwright wants a newer browser build.
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('requestfailed', (r) => errors.push(`request failed: ${r.url()}`));
// Icons come from the Iconify API at runtime; stub them (grey squares) unless REAL_ICONS=1 and you have internet.
if (!process.env.REAL_ICONS)
	await page.route(ICONIFY_HOSTS, (r) => r.fulfill({ body: iconJson(r.request().url()), contentType: 'application/json' }));

await page.goto(url);
await page.getByTestId('elements-list').waitFor();

const run = {
	// "drop <type> [i]": drag element-<type> from the left panel into the form, at the end or before field i.
	// Uses real mouse moves (dragTo() times out). The drop index only updates while the pointer is over a
	// field, so we aim at a field's bottom/top edge, never the dropzone's empty padding.
	async drop(rest) {
		const [type, at] = rest.split(' ');
		const fields = page.locator('[data-form-element]');
		const n = await fields.count();
		const target = n === 0 ? page.locator('#dropzone') : fields.nth(at === undefined ? n - 1 : +at);
		const box = await target.boundingBox();
		const y = n === 0 ? box.y + box.height / 2 : at === undefined ? box.y + box.height - 4 : box.y + 4;
		await page.getByTestId(`element-${type}`).hover();
		await page.mouse.down();
		await page.mouse.move(box.x + 40, y, { steps: 6 });
		await page.mouse.up();
	},
	// Click the nth (0-based) form field to open its settings panel.
	select: (n) => page.locator('[data-form-element]').nth(+n).click(),
	// Click the first visible match by data-testid, else a button by its text. (Hidden popover copies share testids.)
	async click(target) {
		const byId = page.getByTestId(target).filter({ visible: true });
		await ((await byId.count()) ? byId.first() : page.getByRole('button', { name: target, exact: true })).click();
	},
	fill: (rest) => {
		const [sel, ...text] = rest.split(' ');
		return page.fill(sel, text.join(' '));
	},
	key: (k) => page.keyboard.press(k),
	shot: async (name = 'shot') => {
		const file = `${outDir}/${name}.png`;
		await page.screenshot({ path: file });
		console.log('screenshot', file);
	},
	// Print the form schema held by the JSON modal (open it first with "click JSON").
	json: async () => console.log(await page.locator('pre').first().innerText()),
	count: async () => console.log('fields', await page.locator('[data-form-element]').count()),
	eval: async (js) => console.log(await page.evaluate(js)),
	wait: (ms) => page.waitForTimeout(+ms)
};

let code = 0;
for (const cmd of cmds) {
	const [name, ...rest] = cmd.split(' ');
	try {
		console.log('>', cmd);
		await run[name](rest.join(' '));
		await page.waitForTimeout(150); // let Svelte transitions settle
	} catch (e) {
		console.error('FAILED', cmd, '-', e.message.split('\n')[0]);
		await run.shot('failure');
		code = 1;
		break;
	}
}
if (errors.length) console.log('page errors:\n ' + errors.join('\n '));
await browser.close();
process.exit(code);
