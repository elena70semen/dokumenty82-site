import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const issues = [];
const skipped = [];

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt",
  ".xml"
]);

const runtimeRoots = ["app", "components", "lib", "public", "out"];
const rootFiles = ["package.json", "next.config.js", "next.config.mjs", "next.config.ts"];
const envExampleFiles = [
  ".env.example",
  ".env.local.example",
  "env.example",
  "env.local.example"
];

function fail(message) {
  issues.push(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function readIfExists(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : null;
}

function isTextFile(filePath) {
  return textExtensions.has(path.extname(filePath));
}

function walk(dirPath) {
  if (!fs.existsSync(dirPath)) return [];

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === ".next" || entry.name === "node_modules") continue;

    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...walk(entryPath));
      continue;
    }

    if (entry.isFile() && isTextFile(entryPath)) {
      files.push(entryPath);
    }
  }

  return files;
}

function collectRuntimeFiles() {
  const files = [];

  for (const dir of runtimeRoots) {
    files.push(...walk(path.join(root, dir)));
  }

  for (const file of rootFiles) {
    const filePath = path.join(root, file);
    if (fs.existsSync(filePath)) files.push(filePath);
  }

  return files;
}

const analyticsConfigPath = path.join(root, "lib", "integrations", "analytics-config.ts");
const analyticsEventsPath = path.join(root, "lib", "integrations", "analytics-events.ts");
const metrikaComponentPath = path.join(root, "components", "analytics", "YandexMetrika.tsx");
const packageJsonPath = path.join(root, "package.json");

const analyticsConfigText = readIfExists(analyticsConfigPath);
const analyticsEventsText = readIfExists(analyticsEventsPath);
const packageJsonText = readIfExists(packageJsonPath);

assert(analyticsConfigText, "Analytics config stub file is missing.");
assert(analyticsEventsText, "Analytics no-op events file is missing.");
assert(packageJsonText, "package.json is missing.");

if (analyticsConfigText) {
  assert(/enabled:\s*false/.test(analyticsConfigText), "Analytics config must keep enabled: false.");
  assert(/mode:\s*"stub"/.test(analyticsConfigText), 'Analytics config must keep mode: "stub".');
  assert(/yandexMetrikaId:\s*STUB_METRIKA_ID|yandexMetrikaId:\s*"00000000"/.test(analyticsConfigText), "Analytics config must expose only the stub Metrika ID.");
  assert(/domain:\s*"dokumenty82\.ru"/.test(analyticsConfigText), "Analytics config must keep dokumenty82.ru as domain.");
  assert(/siteUrl:\s*"https:\/\/dokumenty82\.ru\/"/.test(analyticsConfigText), "Analytics config must keep the canonical site URL.");
  assert(/canLoadScript:\s*false/.test(analyticsConfigText), "Analytics config must keep canLoadScript: false.");
  assert(/canSendEvents:\s*false/.test(analyticsConfigText), "Analytics config must keep canSendEvents: false.");
}

if (analyticsEventsText) {
  for (const goal of [
    "lead_razbor_situacii_click",
    "phone_click",
    "route_click",
    "show_documents_click",
    "contacts_open",
    "policy_open"
  ]) {
    assert(analyticsEventsText.includes(goal), `Planned analytics goal is missing: ${goal}.`);
  }

  assert(!/\bfetch\s*\(|navigator\.sendBeacon|XMLHttpRequest|new\s+Image\s*\(|\bgtag\s*\(/.test(analyticsEventsText), "Analytics event helpers must remain local no-ops.");
}

if (packageJsonText) {
  const packageJson = JSON.parse(packageJsonText);

  assert(packageJson.scripts?.["check:analytics-stubs"] === "node scripts/check-analytics-stubs.mjs", "package.json must expose check:analytics-stubs.");
  assert(packageJson.scripts?.["check:finalization"]?.includes("npm run check:analytics-stubs"), "check:finalization must include check:analytics-stubs.");
}

if (fs.existsSync(metrikaComponentPath)) {
  const metrikaComponentText = fs.readFileSync(metrikaComponentPath, "utf8");

  assert(/return null/.test(metrikaComponentText), "YandexMetrika component must render null while analytics is disabled.");
  assert(!/dangerouslySetInnerHTML/.test(metrikaComponentText), "YandexMetrika component must not use inline script injection while disabled.");
  assert(!/mc\.yandex|\bym\s*\(/i.test(metrikaComponentText), "YandexMetrika component must not include active Metrika code while disabled.");
}

const existingEnvExamples = envExampleFiles
  .map((file) => path.join(root, file))
  .filter((filePath) => fs.existsSync(filePath));

if (existingEnvExamples.length === 0) {
  skipped.push("SKIPPED_WEBMASTER_ENV_PLACEHOLDERS - no env example file");
} else {
  for (const filePath of existingEnvExamples) {
    const text = fs.readFileSync(filePath, "utf8");
    const rel = path.relative(root, filePath);

    assert(/NEXT_PUBLIC_YANDEX_METRIKA_ENABLED=false/.test(text), `${rel} must keep Metrika disabled.`);
    assert(/NEXT_PUBLIC_YANDEX_METRIKA_ID=00000000/.test(text), `${rel} must use the stub Metrika ID.`);
    assert(/NEXT_PUBLIC_ANALYTICS_MODE=stub/.test(text), `${rel} must keep analytics mode as stub.`);
    assert(!/NEXT_PUBLIC_YANDEX_METRIKA_ID=(?!00000000)\d{6,}/.test(text), `${rel} must not contain a real Metrika ID.`);
  }
}

const runtimeFiles = collectRuntimeFiles();
const forbiddenRuntimePatterns = [
  [/mc\.yandex/i, "Yandex Metrika host must not appear in runtime output/source."],
  [/\bym\s*\(/i, "Active Metrika ym call must not appear in runtime output/source."],
  [/\bgtag\s*\(|googletagmanager|GoogleAnalytics|dataLayer\s*=/i, "Google analytics script/call must not appear in runtime output/source."],
  [/\bG-[A-Z0-9]{6,}\b|\bUA-\d+-\d+\b/i, "Real Google analytics ID must not appear in runtime output/source."],
  [/NEXT_PUBLIC_YANDEX_METRIKA_ENABLED\s*=\s*true/i, "Metrika env flag must not be enabled."],
  [/NEXT_PUBLIC_YANDEX_METRIKA_ID\s*=\s*(?!00000000\b)[1-9]\d{5,}/i, "Real Metrika env ID must not appear."],
  [/webvisor|вебвизор|session\s*replay|sessionReplay|ecommerce/i, "Webvisor/session replay/ecommerce must not be enabled or referenced in runtime output/source."],
  [/PUBLIC_LIVE_ALLOWED\s*=\s*true/i, "PUBLIC_LIVE_ALLOWED must not be true."],
  [/<input\b[^>]*\btype=["']file["']|type:\s*["']file["']/i, "Public upload input must not appear."],
  [/https?:\/\/[^\s"'`]*crm|crmEndpoint|crm_endpoint|webhook\s*[:=]\s*["']https?:\/\//i, "Live CRM/webhook endpoint must not appear."],
  [/t\.me\/|telegram\.me\/|max:\/\//i, "Final messaging deep link must not appear."],
  [/(?:Alt-Svc|alt-svc)[^\n]*h3|listen[^\n]*quic|http3\s+on|quic\s+on/i, "Active HTTP/3/QUIC config must not appear."]
];

for (const filePath of runtimeFiles) {
  const rel = path.relative(root, filePath);
  const text = fs.readFileSync(filePath, "utf8");

  for (const [pattern, message] of forbiddenRuntimePatterns) {
    if (pattern.test(text)) fail(`${message} File: ${rel}`);
  }
}

if (issues.length > 0) {
  console.error("Analytics stub guardrail failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("Analytics stub guardrail passed.");
for (const item of skipped) console.log(item);
