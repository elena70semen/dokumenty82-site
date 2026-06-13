#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const issues = [];

const files = {
  packageJson: "package.json",
  workflow: ".github/workflows/site-ci.yml",
  contract: "lib/forms/form-contract.ts",
  formPlaceholder: "components/forms/FormPlaceholder.tsx",
  situationForm: "components/forms/SituationFormPlaceholder.tsx",
  callbackForm: "components/forms/CallbackFormPlaceholder.tsx",
  showDocumentsForm: "components/forms/ShowDocumentsPlaceholder.tsx"
};

function repoPath(rel) {
  return path.join(root, rel);
}

function read(rel) {
  const full = repoPath(rel);
  return fs.existsSync(full) ? fs.readFileSync(full, "utf8") : "";
}

function assert(condition, message) {
  if (!condition) issues.push(message);
}

for (const [label, rel] of Object.entries(files)) {
  assert(fs.existsSync(repoPath(rel)), `Missing ${label}: ${rel}`);
}

const packageText = read(files.packageJson);
const workflowText = read(files.workflow);
const contractText = read(files.contract);
const formText = read(files.formPlaceholder);
const formFilesText = [
  formText,
  read(files.situationForm),
  read(files.callbackForm),
  read(files.showDocumentsForm),
  contractText
].join("\n");

let packageJson = {};
try {
  packageJson = JSON.parse(packageText);
} catch (error) {
  issues.push(`package.json is not valid JSON: ${error.message}`);
}

assert(packageJson.scripts?.["check:forms-crm-contract"] === "node scripts/check-forms-crm-contract.mjs", "package.json must expose check:forms-crm-contract.");
assert(packageJson.scripts?.["check:finalization"]?.includes("check:forms-crm-contract"), "check:finalization must run check:forms-crm-contract.");
assert(/check:forms-crm-contract/.test(workflowText), "Site CI workflow must run check:forms-crm-contract explicitly.");

assert(/formsLive\s*=\s*false/.test(contractText), "formsLive must stay false in the form contract.");
assert(/formHiddenAttributionFieldIds/.test(contractText), "Form contract must define hidden attribution fields.");

for (const field of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "yclid", "page_slug", "page_type", "cta_label", "cta_location", "lead_topic_hidden"]) {
  assert(contractText.includes(`"${field}"`) || contractText.includes(field), `Form contract must include hidden field: ${field}`);
  assert(formText.includes("formHiddenAttributionFieldIds"), "FormPlaceholder must render hidden attribution fields.");
}

assert(/href="\/policy"/.test(formText), "FormPlaceholder must link to /policy near form actions.");
assert(/data-forms-live=\{String\(formsLive\)\}/.test(formText), "FormPlaceholder must expose data-forms-live from the closed gate.");
assert(/onSubmit=\{\(event\) => \{[\s\S]*?event\.preventDefault\(\)/.test(formText), "Placeholder form submit must be prevented while formsLive=false.");
assert(/disabledFormSubmitMessage/.test(formText), "Placeholder form must use disabled submit fallback copy.");
assert(/formPolicyNotice/.test(formText), "Placeholder form must display policy notice copy.");

const forbiddenPatterns = [
  [/<input\b[^>]*\btype=["']file["']/i, "Public file upload input must not exist."],
  [/fetch\s*\(/, "Form layer must not perform fetch submit."],
  [/XMLHttpRequest/, "Form layer must not perform XMLHttpRequest submit."],
  [/sendBeacon/, "Form layer must not send beacon payloads."],
  [/webhook/i, "Form layer must not contain webhook references."],
  [/endpoint/i, "Form layer must not contain endpoint references."],
  [/token=/i, "Form layer must not contain token references."],
  [/secret=/i, "Form layer must not contain secret references."],
  [/goal_form_submit_success/, "Form layer must not expose success goal while CRM is disabled."],
  [/заявка отправлена|заявка принята|успешно отправ/i, "Form layer must not show false success copy while disabled."]
];

for (const [pattern, message] of forbiddenPatterns) {
  assert(!pattern.test(formFilesText), message);
}

for (const componentName of ["SituationFormPlaceholder", "CallbackFormPlaceholder", "ShowDocumentsPlaceholder"]) {
  assert(new RegExp(`export function ${componentName}`).test(formFilesText), `${componentName} must remain present.`);
}

if (issues.length > 0) {
  console.error("Forms CRM contract check failed:");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log("PASS forms CRM contract: forms remain disabled, policy notice and hidden attribution fields are present, no upload or live submit exists.");
