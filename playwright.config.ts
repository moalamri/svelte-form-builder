import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	name: 'Playwright Tests',
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	reporter: [['html'], ['playwright-ctrf-json-reporter', {}]]
};

export default config;
