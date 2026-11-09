/* global URL, Bun, Response, console */
// Offline stand-in for the Iconify API (@iconify/svelte fetches every icon at runtime).
// Each requested icon becomes a 24x24 grey square, so icon-only buttons (drag handle, delete) get a size and are clickable.
// Imported by driver.mjs (via page.route); run with `bun icon-stub.mjs` to serve it over HTTPS on :8443 for the test suite.
export function iconJson(url) {
	const { pathname, searchParams } = new URL(url);
	const prefix = pathname.slice(1).replace(/\.json$/, '');
	const icons = {};
	for (const name of (searchParams.get('icons') || '').split(','))
		icons[name] = { body: '<rect x="4" y="4" width="16" height="16" rx="3" fill="#94a3b8"/>' };
	return JSON.stringify({ prefix, icons, width: 24, height: 24 });
}

export const ICONIFY_HOSTS = /iconify\.design|simplesvg\.com|unisvg\.com/;

if (import.meta.main) {
	const dir = import.meta.dir;
	const cert = Bun.file(`${dir}/.stub-cert.pem`);
	if (!(await cert.exists()))
		Bun.spawnSync([
			'openssl',
			'req',
			'-x509',
			'-newkey',
			'rsa:2048',
			'-nodes',
			'-days',
			'365',
			'-subj',
			'/CN=iconify-stub',
			'-keyout',
			`${dir}/.stub-key.pem`,
			'-out',
			`${dir}/.stub-cert.pem`
		]);
	Bun.serve({
		port: 8443,
		tls: { cert, key: Bun.file(`${dir}/.stub-key.pem`) },
		fetch: (req) => new Response(iconJson(req.url), { headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' } })
	});
	console.log('iconify stub on https://localhost:8443');
}
