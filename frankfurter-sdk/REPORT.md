# Voxgig SDK Evaluation Observations Report

## 1. Summary

This report covers the TypeScript-only `frankfurter-sdk` generated with
`@voxgig/sdkgen` from the Frankfurter OpenAPI specification. The project
identity was checked in `.sdk/def/openapi.json`, `ts/package.json`, and
`README.md`; all three identify Frankfurter, not Open-Meteo or Nager.Date.
The TypeScript build succeeded, and the test runner reported 239 passed, 0
failed, and 12 skipped tests. A live `/rates` request also succeeded through
the generated SDK.

## 2. API chosen and verification

- API: Frankfurter API, server https://api.frankfurter.dev/v2. Needs no API key.
- Spec source: https://api.frankfurter.dev/v2/openapi.json (OpenAPI 3.1.2,
  `"Frankfurter API"`, version 2.1.1), downloaded unmodified on **not
  verified**.
- Target: TypeScript only (`ts/`).
- The local `.sdk/def/openapi.json` reports OpenAPI `3.1.2`, title
  `Frankfurter API`, version `2.1.1`, and server
  `https://api.frankfurter.dev/v2`.

I checked
https://github.com/orgs/voxgig-sdk/repositories?q=frankfurter and
https://voxgig.com/voxgig-sdk on **2026-10-21; exact local time not
recorded**. Both web requests returned HTTP 200, and neither response
contained `frankfurter-sdk`. This is the result actually observed; repository
membership beyond those responses was not verified.

Earlier attempts: I first generated from an Open-Meteo spec, which turned out
to already exist in the voxgig-sdk org, and then looked at the Nager.Date Pro
spec, which declares an API key and has no servers block. I switched to
Frankfurter for these reasons.

## 3. Steps and time per step

Environment: Windows, PowerShell, project inside a OneDrive-synced folder.
No OneDrive or sync problems were observed during the commands run for this
report.

| Step               | Time                                  |
| ------------------ | ------------------------------------- |
| Finding the spec   | not verified                          |
| Scaffold/generate  | not verified                          |
| Build/test         | not verified as human time            |
| Doctor             | not verified as human time            |
| Live call          | not verified as human time            |
| Repository cleanup | not verified                          |
| Report             | not verified as human time            |
| Total human work   | not verified; time-box was 30 minutes |

## 4. Results

### Build

Run from `ts/`:

```text
npm run build
```

The command completed with exit code `0` and printed:

```text
> @voxgig-sdk/frankfurter-sdk@0.0.1 build
> node -e "for (const p of process.argv.slice(1)) require('fs').rmSync(p, { recursive: true, force: true })" dist dist-test && tsc --build src test
```

### Tests

Run from `ts/` with `npm test`. The command's `pretest` hook ran the build
first. The test runner printed:

```text
ℹ tests 251
ℹ suites 35
ℹ pass 239
ℹ fail 0
ℹ cancelled 0
ℹ skipped 12
ℹ todo 0
ℹ duration_ms 15230.5238
```

Exact counts:

- Passed: `239`
- Failed: `0`
- Skipped: `12`

### Doctor

Run from `.sdk`:

```text
npx voxgig-sdkgen doctor
```

Exact output:

```text
[11:22:34.682] INFO: sdkgen                 doctor-start
[11:22:34.889] INFO: sdkgen                 doctor-end           .sdk matches the scaffold (0 additive)
```

### Generated entities and operations

The generated `SUMMARY.md` reports 4 entities and 9 HTTP routes. The routes
match all 9 paths in the specification:

- Coverage: `GET /coverage` (`load`)
- Currency: `GET /currencies` (`list`), `GET /currency/{code}` (`load`)
- Provider: `GET /providers` (`list`), `GET /providers/{provider}` (`load`)
- Rate: `GET /rates` (`list`), `GET /rate/{base}/{quote}` (`load`),
  `GET /providers/{provider}/rates` (`list`), and
  `GET /providers/{provider}/rate/{base}/{quote}` (`load`)

No missing, merged, or oddly named paths were observed in the generated
summary.

### Live SDK call

The following code was run from `ts/` after building:

```js
const { FrankfurterSdkSDK } = require("./dist/FrankfurterSdkSDK.js");
const client = new FrankfurterSdkSDK();
client
  .direct({
    path: "/rates",
    method: "GET",
    query: { base: "EUR", quotes: "USD" },
  })
  .then((result) => {
    console.log(
      JSON.stringify({
        ok: result.ok,
        status: result.status,
        data: result.data,
      }),
    );
  });
```

Actual output:

```text
{"ok":true,"status":200,"data":[{"date":"2026-10-21","base":"EUR","quote":"USD","rate":1.1227}]}
```

## 5. Bugs, issues, and friction

- Running `npx voxgig-sdkgen doctor` from the project root, from `ts/`, or
  from the parent folder fails with:

  ```text
  npm error code E404 ... GET https://registry.npmjs.org/voxgig-sdkgen - Not found
  ```

  It only works from inside `.sdk`, because `voxgig-sdkgen` is a command
  installed into `.sdk` by `@voxgig/sdkgen`, not a standalone npm package,
  and the error message does not say so.

- The test run printed this Node warning:

  ```text
  (node:5972) ExperimentalWarning: stripTypeScriptTypes is an experimental feature and might change at any time
  (Use `node --trace-warnings ...` to show where the warning was created)
  ```

- `CHANGELOG.md` claims an initial release for TypeScript, Python, PHP, Go,
  Ruby, Lua, CLI, and MCP surfaces. Only `ts/` is present as a generated
  target in this project, so that changelog statement does not match the
  checked-out target tree.
- The response interfaces are specific (`Coverage`, `Currency`, `Provider`,
  and `Rate`), but generated fields derived from unconstrained OpenAPI arrays
  or map-like values include `any[]` and `Record<string, any>` in
  `ts/src/FrankfurterSdkTypes.ts`.
- `.gitignore` ignores `node_modules`, but it does not contain explicit
  `dist` or `.sdk` build/cache rules.
- `LICENSE` is MIT and names `Voxgig` as the copyright holder:
  `Copyright (c) 2026 Voxgig`.
- The package homepage, repository, and issue URLs use the project-specific
  `voxgig-sdk/frankfurter-sdk` URLs. Whether those URLs are live is not
  verified.
- Whether the generator accepted the OpenAPI 3.1.2 input without warnings
  cannot be verified from the captured generate output. The generated
  artifacts and subsequent build confirm that generation produced output.
- Warnings or npm audit findings from the earlier install/generate commands
  were not captured here and are not verified.

## 6. Improvements to the tool or docs

- Make the doctor command available through a documented project-root
  wrapper, or make the error explain that it must be run from `.sdk`.
- Avoid generating changelog claims for targets and surfaces that were not
  selected.
- Add explicit generated-output and `.sdk` cache guidance to `.gitignore`, or
  document why those directories are intentionally retained.
- Preserve more precise types for OpenAPI arrays and map-like fields where the
  schema provides enough information.

## 7. Reproduction commands

```text
npm create @voxgig/sdkgen -- frankfurter-sdk -d ./openapi.json -o ./frankfurter-sdk
```

Then in `.sdk`:

```text
npx voxgig-sdkgen target add ts
npx voxgig-sdkgen feature add test
npm run generate
npx voxgig-sdkgen doctor
```

Then in `ts`:

```text
npm install
npm run build
npm test
```

## 8. AI assistance disclosure

GitHub Copilot supplied the Voxgig commands, ran the verification commands,
inspected the generated files, executed the live SDK call, and drafted this
report from the resulting repository contents and command output.

## Items not verified

- Exact date/time when `openapi.json` was downloaded.
- Exact local time of the GitHub organization and Voxgig catalog checks.
- Human time spent per step and total human time.
- The captured output of the earlier install and generation commands,
  including any npm audit findings.
- Whether the project-specific repository URLs are live.
- Whether generation itself emitted warnings before the captured build,
  doctor, test, and live-call steps.
