---
name: run-svelte-form-builder
description: Build, run, and drive the Svelte form builder (SvelteKit + Svelte 5). Use when asked to start the app, run its Playwright tests, take a screenshot of the builder, drag fields into a form, or check a UI change works in the real app.
---

A SvelteKit SPA (drag-and-drop form builder). An agent drives it with
`.claude/skills/run-svelte-form-builder/driver.mjs`: a Playwright script that
opens the dev server headless, runs a list of commands (drop / click / fill /
shot / json ...) and prints the results. All paths are relative to the repo root.

## Setup

Bun and Node are used (CI uses `bun install`). No apt packages were needed.

```bash
bun install
```

Browser: the project's Playwright (1.65) wants Chromium build 1254, and
`npx playwright install chromium` can't download it in a sandbox. Point
`CHROMIUM_PATH` at any Chromium you have. In the Claude cloud container:

```bash
export CHROMIUM_PATH=/opt/pw-browsers/chromium
```

With internet access, `npx playwright install chromium` and leave it unset.

## Run (agent path)

Start the dev server, wait for the port:

```bash
bun run dev --port 5173 > /tmp/sfb-dev.log 2>&1 &
timeout 60 bash -c 'until curl -sf http://localhost:5173 >/dev/null; do sleep 1; done'
```

Smoke flow (drops title, input, radio; selects the input; screenshots editor,
preview and the JSON modal; prints the form JSON):

```bash
node .claude/skills/run-svelte-form-builder/driver.mjs
```

Custom flow, one quoted string per command:

```bash
node .claude/skills/run-svelte-form-builder/driver.mjs \
  'drop input' 'drop title' 'click delete-button' 'click delete-button-yes' 'wait 400' 'count' \
  'select 0' 'fill [data-testid=editor-title]>>input Hello RTL' 'click Preview' 'shot edited' 'eval document.dir'
```

Screenshots land in `/tmp/sfb-shots/<name>.png` (override with `SHOTS_DIR`).
On a failing command it saves `failure.png`, prints `FAILED ...` and exits 1.
Page errors and failed requests are printed at the end.

| command | what it does |
|---|---|
| `drop <type> [i]` | drag `element-<type>` (input, textarea, checkbox, radio, title, divider) to the end of the form, or before field `i` |
| `select <i>` | click field `i` (0-based) to open its settings in the right panel |
| `click <x>` | click first visible `data-testid=x`, else the button with text `x` (`Preview`, `Edit`, `JSON`, `COPY`) |
| `fill <selector> <text>` | fill an input; selector must have no spaces (use `>>` to chain) |
| `key <Key>` | keyboard press |
| `shot [name]` | screenshot |
| `json` | print the form schema (open the modal first: `click JSON`) |
| `count` | print number of fields in the form |
| `eval <js>` | evaluate an expression in the page and print it |
| `wait <ms>` | sleep |

`--url http://localhost:4173` as the first argument targets `bun run preview` instead.

Stop: `lsof -ti:5173 -sTCP:LISTEN | xargs -r kill`

## Run (human path)

`bun run dev` then open http://localhost:5173. Useless headless.

## Test

Offline-safe wrapper around `playwright.config.ts` (builds, runs `vite preview`
on 4173, and serves stub icons on 8443):

```bash
npx playwright test -c .claude/skills/run-svelte-form-builder/pw.config.ts
```

Expect `11 passed` (~20s). With internet and a matching browser, plain
`npx playwright test` is what CI runs. Type check: `bun run check` (passes).

## Gotchas

- **Icons come from the network.** `@iconify/svelte` fetches every icon from
  `api.iconify.design` at runtime. Offline, icons render as nothing, so the drag
  handle (`.handle`) and the delete button have zero size and 4 tests in
  `sort.spec.ts`/`remove.spec.ts` fail. `icon-stub.mjs` answers those requests
  with grey squares: the driver uses it via `page.route` (set `REAL_ICONS=1` to
  skip), `pw.config.ts` runs it as an HTTPS server and maps the hosts to it with
  `--host-resolver-rules`.
- **Chromium in the sandbox uses a proxy**, and resolver rules are ignored for
  proxied hosts. `pw.config.ts` passes `--no-proxy-server`; without it the stub
  is never hit (`ERR_TUNNEL_CONNECTION_FAILED`).
- **Two webServers drop the implicit `baseURL`.** The wrapper sets
  `baseURL: http://localhost:4173` itself, or every `page.goto('/')` fails.
- **Drop position only updates while the pointer is over a field.** Releasing
  in the dropzone's empty padding uses a stale index (fields land in the wrong
  order). The driver aims at the last field's bottom edge (or field `i`'s top edge).
  `locator.dragTo()` times out; use real `mouse.down/move/up`.
- **Every field has a portalled delete popover with the same testid.** Use the
  first *visible* `delete-button-yes`, which `click` does.
- **Removed fields linger during the outro transition.** `count` right after a
  delete still sees them; `wait 400` first.
- `bun run lint` already fails on `main` (44 eslint errors in `src/`); the skill
  files themselves pass eslint and prettier.

## Troubleshooting

- **`Executable doesn't exist at /opt/pw-browsers/chromium_headless_shell-1254/...`**:
  Playwright version vs installed browser mismatch. Set `CHROMIUM_PATH`.
- **`Failed to download Chrome for Testing ... Download failure, code=1`** from
  `npx playwright install`: no network for the CDN. Set `CHROMIUM_PATH`.
- **Tests: `waiting for locator('.handle').first()` timeouts**: icons not loading;
  use the wrapper config, not the base one.
