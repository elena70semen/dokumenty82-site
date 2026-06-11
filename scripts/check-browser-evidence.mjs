import path from "node:path";
import { evidenceDir, formRoutes, p0Routes, read } from "./evidence-utils.mjs";

function parseJson(file) {
  return JSON.parse(read(file));
}

const browser = parseJson(path.join(evidenceDir, "browser", "browser-route-proof.json"));
const forms = parseJson(path.join(evidenceDir, "forms", "form-placeholder-proof.json"));
const rendered = parseJson(path.join(evidenceDir, "rendered", "rendered-dom-proof.json"));
const safety = parseJson(path.join(evidenceDir, "final-local", "safety-proof.json"));
const browserSmoke = parseJson(path.join(evidenceDir, "browser", "playwright-smoke-proof.json"));

const issues = [];

if (browser.status !== "passed") issues.push("browser-route-proof is not passed");
if (browser.routes?.length !== p0Routes.length) issues.push(`browser-route-proof route count mismatch: ${browser.routes?.length}`);
for (const route of browser.routes ?? []) {
  if (!route.passed) issues.push(`browser proof failed for ${route.route}: ${(route.failures ?? []).join("; ")}`);
  if (route.consoleErrors?.length) issues.push(`console errors recorded for ${route.route}`);
}

if (forms.status !== "passed") issues.push("form-placeholder-proof is not passed");
if (forms.routes?.length !== formRoutes.length) issues.push(`form route count mismatch: ${forms.routes?.length}`);
for (const route of forms.routes ?? []) {
  if (!route.passed) issues.push(`form proof failed for ${route.route}: ${(route.failures ?? []).join("; ")}`);
}

if (rendered.status !== "passed") issues.push("rendered-dom-proof is not passed");
if (rendered.routes?.length !== p0Routes.length) issues.push(`rendered route count mismatch: ${rendered.routes?.length}`);

if (browserSmoke.status !== "passed") issues.push("playwright-smoke-proof is not passed");

if (safety.status !== "passed") issues.push("final local safety proof is not passed");

if (issues.length) {
  console.error("Browser evidence check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("PASS local browser evidence: route, form, rendered DOM, screenshot smoke and safety proofs verified.");
