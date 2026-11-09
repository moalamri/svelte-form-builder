// Agent wrapper around the project's playwright.config.ts for offline containers:
// - CHROMIUM_PATH: use a preinstalled Chromium when `npx playwright install` can't download the matching build.
// - Routes Iconify API hosts to icon-stub.mjs on :8443, so icon-only buttons render and tests can click them.
import base from '../../../playwright.config';

const stub =
	'MAP api.iconify.design 127.0.0.1:8443, MAP api2.iconify.design 127.0.0.1:8443, MAP api.simplesvg.com 127.0.0.1:8443, MAP api.unisvg.com 127.0.0.1:8443';

export default {
	...base,
	testDir: '../../../tests',
	reporter: 'list',
	webServer: [
		{ ...base.webServer, cwd: '../../..' },
		{ command: 'bun icon-stub.mjs', url: 'https://localhost:8443/x.json', ignoreHTTPSErrors: true }
	],
	use: {
		...base.use,
		baseURL: 'http://localhost:4173', // implicit with one webServer, required with two
		ignoreHTTPSErrors: true,
		launchOptions: {
			executablePath: process.env.CHROMIUM_PATH || undefined,
			args: [`--host-resolver-rules=${stub}`, '--ignore-certificate-errors', '--no-proxy-server'] // resolver rules are skipped for proxied hosts
		}
	}
};
