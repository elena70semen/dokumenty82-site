#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {
  countMatches,
  decodeHtml,
  ensureDir,
  evidenceDir,
  extractCanonical,
  extractH1Text,
  extractTitle,
  formRoutes,
  listFiles,
  p0Routes,
  read,
  routeToHtmlFile,
  stripTags,
  writeJson,
  writeText
} from "./evidence-utils.mjs";

const root = process.cwd();
const repoRoot = path.resolve(root, "..");
const ownerLegalDir = path.join(evidenceDir, "owner-legal-privacy");
const sourceCommit = execSync("git rev-parse --short HEAD", { cwd: repoRoot, encoding: "utf8" }).trim();
const featureFlagsText = read(path.join(root, "lib", "feature-flags.ts"));
const policyHtml = read(routeToHtmlFile("/policy/"));
const footerHtml = policyHtml.match(/<footer\b[\s\S]*?<\/footer>/i)?.[0] ?? "";
const visiblePolicyText = stripTags(policyHtml);

const requiredSources = [
  "AGENTS.md",
  "README.md",
  "docs/00-start/active-canon-index.md",
  "docs/00-start/hold-register.md",
  "docs/operations/live-launch-gates-v1.md",
  "docs/operations/project-finalization-readiness-v1.md",
  "docs/operations/launch-finalization-roadmap-v1.md",
  "docs/legal/site-legal-compliance-rf-v1.md",
  "docs/legal/legal-source-register-rf.md",
  "docs/legal/personal-data-152fz-site-checklist.md",
  "docs/legal/privacy-policy-consent-and-notices.md",
  "docs/legal/forms-cookies-analytics-crm-compliance.md",
  "docs/legal/cross-border-third-party-services-register.md",
  "docs/legal/site-publication-owner-info-and-disclaimers.md",
  "docs/legal/ip-media-fonts-maps-licenses.md",
  "docs/legal/security-retention-access-control.md",
  "docs/legal/legal-pages-and-ui-notices-proposal.md",
  "docs/legal/site-maintenance-legal-ops-plan.md",
  "docs/crm-analytics/route-to-lead-traceability-v1.md",
  "docs/crm-analytics/metrica-goals-and-crm-contract.md",
  "docs/ux/site-lead-collectors-v1.md",
  "docs/ux/contact-actions-v1.md",
  "docs/ux/page-lead-collector-map.md",
  "code/app/policy/page.tsx",
  "code/lib/feature-flags.ts",
  "code/BROWSER_ACCESSIBILITY_EVIDENCE_REPORT.md",
  "code/LOCAL_P0_BUILD.md"
];

const sourceFiles = [
  ...listFiles(path.join(root, "app")),
  ...listFiles(path.join(root, "components")),
  ...listFiles(path.join(root, "lib"))
].filter((file) => {
  const rel = path.relative(root, file).split(path.sep).join("/");
  return /\.(ts|tsx|js|jsx|mjs|json|css)$/i.test(file) && !rel.startsWith("lib/pricing/");
});

const renderedFiles = p0Routes.map(routeToHtmlFile).filter((file) => fs.existsSync(file));
const scannedFiles = [...renderedFiles, ...sourceFiles];
const scannedText = scannedFiles.map((file) => read(file)).join("\n");
const renderedVisibleText = renderedFiles.map((file) => stripTags(read(file))).join("\n");
const formsHtml = formRoutes.map((route) => read(routeToHtmlFile(route))).join("\n");
const secretLikeFiles = scannedFiles.filter((file) => /\.(pem|key)$/i.test(path.basename(file)));

function flagIsFalse(flag) {
  return new RegExp(`${flag}:\\s*false`).test(featureFlagsText);
}

function flagIsTrue(flag) {
  return new RegExp(`${flag}:\\s*true`).test(featureFlagsText);
}

function readJson(rel) {
  const file = path.join(root, rel);
  return fs.existsSync(file) ? JSON.parse(read(file)) : null;
}

function noPattern(pattern, text = scannedText) {
  pattern.lastIndex = 0;
  return !pattern.test(text);
}

function requiredSourceStatus(rel) {
  const full = path.join(repoRoot, rel);
  return {
    path: rel,
    present: fs.existsSync(full)
  };
}

const sourceStatus = requiredSources.map(requiredSourceStatus);
const missingSources = sourceStatus.filter((source) => !source.present).map((source) => source.path);

const browserEvidence = readJson("evidence/browser/browser-route-proof.json");
const accessibilityEvidence = readJson("evidence/accessibility/accessibility-proof.json");
const formsEvidence = readJson("evidence/forms/form-placeholder-proof.json");
const safetyEvidence = readJson("evidence/final-local/safety-proof.json");

const policyRoutePresent = Boolean(policyHtml);
const policyTitle = extractTitle(policyHtml);
const policyH1 = extractH1Text(policyHtml);
const policyCanonical = extractCanonical(policyHtml);
const policyFooterLinkPresent = /href=["']\/policy\/?["']/i.test(footerHtml);
const policyCommercialSignals = /скидк|цена|стоимость|100% результат|гарантируем|отзывы|рейтинг/i.test(visiblePolicyText);
const policyAggressiveCta = /Оставить заявку|Заявка отправлена|успешно отправ/i.test(visiblePolicyText);

const formPlaceholderCount = countMatches(formsHtml, /data-form-placeholder=["']true["']/gi);
const formActionCount = countMatches(formsHtml, /<form\b[^>]*\saction=["'][^"']+["']/gi);
const methodPostCount = countMatches(formsHtml, /<form\b[^>]*\smethod=["']post["']/gi);
const submitControlCount = countMatches(formsHtml, /<(button|input)\b[^>]*type=["']submit["']/gi);
const fileInputCount = countMatches(formsHtml, /<input\b[^>]*type=["']file["']/gi);
const formFallbackPresent = /href=["']\/kontakty\/?["']|href=["']tel:\+79789987222["']/i.test(formsHtml);
const offlineTextPresent = renderedVisibleText.includes("Онлайн-отправка пока не подключена");
const falseSuccessPresent = /заявка отправлена|заявка принята|успешно отправ/i.test(renderedVisibleText);

const noBackendEndpoint =
  !fs.existsSync(path.join(root, "app", "api")) &&
  listFiles(path.join(root, "app")).filter((file) => /[\\/]route\.(ts|js|mjs)$/i.test(file)).length === 0 &&
  formActionCount === 0 &&
  methodPostCount === 0;

const proof = {
  reviewedAtLocal: new Date().toISOString(),
  sourceCommit,
  publicLiveAllowed: false,
  formsLive: flagIsFalse("formsLive") ? false : null,
  crmSuccessEnabled: flagIsFalse("crmSuccessEnabled") ? false : null,
  analyticsEnabled: flagIsFalse("analyticsEnabled") ? false : null,
  metricaEnabled: flagIsFalse("metricaEnabled") ? false : null,
  maxEnabled: flagIsFalse("maxEnabled") ? false : null,
  telegramEnabled: flagIsFalse("telegramEnabled") ? false : null,
  mapEnabled: flagIsFalse("mapEnabled") ? false : null,
  cookieNoticeEnabled: flagIsFalse("cookieNoticeEnabled") ? false : null,
  formPlaceholdersEnabled: flagIsTrue("formPlaceholdersEnabled"),
  policyRoutePresent,
  policyFooterLinkPresent,
  formsPlaceholderOnly:
    formsEvidence?.status === "passed" &&
    formPlaceholderCount === formRoutes.length &&
    formActionCount === 0 &&
    methodPostCount === 0 &&
    submitControlCount === 0 &&
    fileInputCount === 0 &&
    formFallbackPresent &&
    offlineTextPresent,
  noUpload: fileInputCount === 0 && noPattern(/<input\b[^>]*type=["']file["']/i),
  noSubmit: submitControlCount === 0 && noPattern(/<(button|input)\b[^>]*type=["']submit["']/i),
  noBackendEndpoint,
  noWebhook: noPattern(/webhook/i),
  noSecrets: secretLikeFiles.length === 0 && noPattern(/OPENAI_API_KEY|sk-[A-Za-z0-9_-]{12,}|token=|secret=/i),
  noAnalyticsScripts: noPattern(/GoogleAnalytics|gtag\(|data-goal|analytics\.js|googletagmanager/i),
  noMetricaScripts: noPattern(/ym\(|mc\.yandex|counterId|metrika|yandex_metrica/i),
  noTelegramMaxDeepLinks: noPattern(/t\.me\/|telegram\.me\/|max:\/\//i),
  noPrices: noPattern(/скидк|цена|стоимость/i, renderedVisibleText),
  noGuarantees: noPattern(/100% результат|гарантируем|без отказа|срочно за 1 день/i, renderedVisibleText),
  noReviewsRatings: noPattern(/AggregateRating|ReviewRating|ReviewSchema|["@']@type["@']\s*:\s*["@']Review["@']|отзывы|рейтинг/i),
  ownerLegalReviewRequired: true,
  publicLaunchReady: false,
  verdict: "HOLD/NOT_PUBLIC_LAUNCH_READY",
  sourceDocuments: sourceStatus,
  missingSources,
  reviewedRoutes: p0Routes,
  policyAudit: {
    title: policyTitle,
    h1: policyH1,
    canonical: policyCanonical,
    notCommercialLanding: !policyCommercialSignals,
    noAggressiveCta: !policyAggressiveCta,
    ownerLegalSignoffRequired: true
  },
  formAudit: {
    formPlaceholderCount,
    expectedFormPlaceholderCount: formRoutes.length,
    formActionCount,
    methodPostCount,
    submitControlCount,
    fileInputCount,
    fallbackPresent: formFallbackPresent,
    offlineTextPresent,
    falseSuccessPresent
  },
  secretLikeFiles: secretLikeFiles.map((file) => path.relative(root, file)),
  evidenceStatus: {
    browser: browserEvidence?.status ?? "missing",
    accessibility: accessibilityEvidence?.status ?? "missing",
    forms: formsEvidence?.status ?? "missing",
    finalLocalSafety: safetyEvidence?.status ?? "missing"
  },
  blockers: [
    "PUBLIC_LIVE_ALLOWED = false",
    "owner/legal acceptance missing",
    "legal/privacy review required",
    "live forms disabled",
    "CRM disabled",
    "analytics disabled",
    "Metrica disabled",
    "cookie notice disabled",
    "MAX disabled",
    "Telegram disabled",
    "live map disabled",
    "production deploy not performed",
    "staging proof missing",
    "rollback proof missing",
    "Search Console/Yandex Webmaster setup missing",
    "FNS live/autopublish disabled"
  ]
};

ensureDir(ownerLegalDir);
writeJson(path.join(ownerLegalDir, "owner-legal-privacy-proof.json"), proof);
writeText(
  path.join(ownerLegalDir, "owner-legal-privacy-proof-summary.md"),
  `# Owner Legal Privacy Proof\n\nStatus: ${proof.verdict}\n\nSource commit: ${sourceCommit}\n\nMissing sources: ${missingSources.length ? missingSources.join(", ") : "none"}\n\nPolicy route present: ${proof.policyRoutePresent ? "PASS" : "FAIL"}\n\nForms placeholder-only: ${proof.formsPlaceholderOnly ? "PASS" : "FAIL"}\n\nNo live upload/submit/backend/analytics/Metrica/messaging deep links: ${
    proof.noUpload &&
    proof.noSubmit &&
    proof.noBackendEndpoint &&
    proof.noAnalyticsScripts &&
    proof.noMetricaScripts &&
    proof.noTelegramMaxDeepLinks
      ? "PASS"
      : "FAIL"
  }\n\nPublic launch ready: ${proof.publicLaunchReady}\n`
);

console.log(`Owner/legal/privacy evidence generated in ${path.relative(root, ownerLegalDir)}`);
