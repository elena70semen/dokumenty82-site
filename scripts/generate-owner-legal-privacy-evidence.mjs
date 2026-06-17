#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {
  countMatches,
  ensureDir,
  evidenceDir,
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
const ownerLegalDir = path.join(evidenceDir, "owner-legal-privacy");
const mode = "PUBLIC_LIVE_METRICA_NO_PII_WITH_COOKIE_NOTICE";
const verdict = "PUBLIC_LIVE_METRICA_NO_PII_WITH_COOKIE_NOTICE_OWNER_LEGAL_REVIEW_REQUIRED";

const sourceRequiredDocs = [
  "AGENTS.md",
  "docs/00-start/source-of-truth.md",
  "docs/00-start/active-canon-index.md",
  "docs/00-start/hold-register.md",
  "docs/legal/forms-cookies-analytics-crm-compliance.md",
  "docs/legal/privacy-policy-consent-and-notices.md",
  "docs/crm-analytics/metrica-goals-and-crm-contract.md",
  "docs/crm-analytics/events.md"
];

const siteRequiredDocs = [
  "AGENTS.md",
  "README.md",
  "package.json",
  "lib/feature-flags.ts",
  "lib/tracking/tracking-adapter.ts",
  "lib/tracking/event-context.ts",
  "lib/tracking/attribution.ts",
  "app/layout.tsx",
  "app/policy/page.tsx",
  "components/CookieAnalyticsNotice.tsx",
  "components/forms/FormPlaceholder.tsx",
  "scripts/check-tracking-no-pii.mjs",
  "scripts/generate-owner-legal-privacy-evidence.mjs",
  "scripts/check-owner-legal-privacy-evidence.mjs",
  "scripts/check-forms-crm-contract.mjs",
  "scripts/check-launch-live-config.mjs",
  "docs/release/p0-final-production-artifact-alignment.md"
];

function safeGit(args, cwd) {
  try {
    return execSync(`git ${args}`, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return null;
  }
}

function findSourceRoot() {
  const candidates = [
    process.env.SOURCE_OF_TRUTH_ROOT,
    path.resolve(root, "..", "dokumenty-dlya-biznesa-origin-main"),
    path.resolve(root, "..", "dokumenty-dlya-biznesa"),
    path.resolve(root, "..", "dokumenty-dlya-biznesa-source")
  ].filter(Boolean);

  return candidates.find((candidate) => fs.existsSync(path.join(candidate, "docs", "00-start", "source-of-truth.md"))) ?? null;
}

function flagValue(flagsText, flag) {
  const match = flagsText.match(new RegExp(`${flag}:\\s*(true|false)`));
  return match ? match[1] === "true" : null;
}

function noPattern(pattern, text) {
  pattern.lastIndex = 0;
  return !pattern.test(text);
}

function statusFor(rootDir, rel) {
  return {
    path: rel,
    present: Boolean(rootDir && fs.existsSync(path.join(rootDir, rel)))
  };
}

const sourceRoot = findSourceRoot();
const siteHeadCommit = safeGit("rev-parse --short HEAD", root);
const siteDirty = Boolean(safeGit("status --porcelain", root));
const siteCommit = siteHeadCommit ? `${siteHeadCommit}${siteDirty ? "+worktree" : ""}` : null;
const sourceCommit = sourceRoot ? safeGit("rev-parse --short HEAD", sourceRoot) : null;
const featureFlagsText = read(path.join(root, "lib", "feature-flags.ts"));
const policyHtml = read(routeToHtmlFile("/policy/"));
const homeHtml = read(routeToHtmlFile("/"));
const renderedFiles = p0Routes.map(routeToHtmlFile).filter((file) => fs.existsSync(file));
const renderedVisibleText = renderedFiles.map((file) => stripTags(read(file))).join("\n");
const visiblePolicyText = stripTags(policyHtml);
const formsHtml = formRoutes.map((route) => read(routeToHtmlFile(route))).join("\n");

const appSourceFiles = [
  ...listFiles(path.join(root, "app")),
  ...listFiles(path.join(root, "components")),
  ...listFiles(path.join(root, "lib"))
].filter((file) => /\.(ts|tsx|js|jsx|mjs|json|css)$/i.test(file) && !file.includes(`${path.sep}lib${path.sep}pricing${path.sep}`));

const scannedRuntimeText = appSourceFiles.map((file) => read(file)).join("\n");
const eventRuntimeText = [
  read(path.join(root, "lib", "tracking", "event-context.ts")),
  read(path.join(root, "lib", "tracking", "tracking-adapter.ts")),
  read(path.join(root, "lib", "tracking", "attribution.ts")),
  read(path.join(root, "components", "tracking", "TrackedAction.tsx")),
  read(path.join(root, "components", "tracking", "AttributionCapture.tsx")),
  read(path.join(root, "components", "forms", "FormPlaceholder.tsx")),
  read(path.join(root, "lib", "forms", "form-contract.ts"))
].join("\n");

const layoutText = read(path.join(root, "app", "layout.tsx"));
const cookieNoticeText = read(path.join(root, "components", "CookieAnalyticsNotice.tsx"));
const eventContextText = read(path.join(root, "lib", "tracking", "event-context.ts"));
const noPiiCheckText = read(path.join(root, "scripts", "check-tracking-no-pii.mjs"));

const sourceStatus = sourceRequiredDocs.map((rel) => statusFor(sourceRoot, rel));
const siteStatus = siteRequiredDocs.map((rel) => statusFor(root, rel));
const missingSiteDocs = siteStatus.filter((doc) => !doc.present).map((doc) => doc.path);

const formPlaceholderCount = countMatches(formsHtml, /data-form-placeholder=["']true["']/gi);
const formActionCount = countMatches(formsHtml, /<form\b[^>]*\saction=["'][^"']+["']/gi);
const methodPostCount = countMatches(formsHtml, /<form\b[^>]*\smethod=["']post["']/gi);
const submitControlCount = countMatches(formsHtml, /<(button|input)\b[^>]*type=["']submit["']/gi);
const fileInputCount = countMatches(formsHtml, /<input\b[^>]*type=["']file["']/gi);

const sourceForbiddenKeys = [
  "phone",
  "email",
  "name",
  "message",
  "comment",
  "question",
  "documents",
  "document_text",
  "file",
  "file_name",
  "scan",
  "inn",
  "ogrn",
  "passport",
  "requisites",
  "bank",
  "crm_notes"
];
const safeBlock = eventContextText.match(/safeTrackingParamKeys\s*=\s*\[([\s\S]*?)\]\s*as const/)?.[1] ?? "";
const forbiddenBlock = eventContextText.match(/forbiddenTrackingParamKeys\s*=\s*\[([\s\S]*?)\]\s*as const/)?.[1] ?? "";
const forbiddenKeysCovered = sourceForbiddenKeys.every((key) => new RegExp(`"${key}"`).test(forbiddenBlock) && !new RegExp(`"${key}"`).test(safeBlock));

const directYmOutsideLayout = appSourceFiles
  .map((file) => ({ file, rel: path.relative(root, file).split(path.sep).join("/"), text: read(file) }))
  .filter((entry) => entry.rel !== "app/layout.tsx" && /\bym\s*\(/.test(entry.text))
  .map((entry) => entry.rel);

const proof = {
  reviewedAtLocal: new Date().toISOString(),
  mode,
  verdict,
  siteCommit,
  sourceTruthRoot: sourceRoot ? path.relative(path.resolve(root, ".."), sourceRoot) || sourceRoot : null,
  sourceCommit,
  sourceTruthAvailable: Boolean(sourceRoot),
  sourceDocuments: sourceStatus,
  siteDocuments: siteStatus,
  missingSiteDocs,
  publicLiveAllowed: flagValue(featureFlagsText, "publicLiveAllowed"),
  formsLive: flagValue(featureFlagsText, "formsLive"),
  crmEnabled: flagValue(featureFlagsText, "crmEnabled"),
  crmSuccessEnabled: flagValue(featureFlagsText, "crmSuccessEnabled"),
  analyticsEnabled: flagValue(featureFlagsText, "analyticsEnabled"),
  metricaEnabled: flagValue(featureFlagsText, "metricaEnabled"),
  paidTrafficAllowed: flagValue(featureFlagsText, "paidTrafficAllowed"),
  localProfilesPublic: flagValue(featureFlagsText, "localProfilesPublic"),
  maxEnabled: flagValue(featureFlagsText, "maxEnabled"),
  telegramEnabled: flagValue(featureFlagsText, "telegramEnabled"),
  messagingEnabled: flagValue(featureFlagsText, "messagingEnabled"),
  messagingRevealEnabled: flagValue(featureFlagsText, "messagingRevealEnabled"),
  mapEnabled: flagValue(featureFlagsText, "mapEnabled"),
  cookieNoticeEnabled: flagValue(featureFlagsText, "cookieNoticeEnabled"),
  formPlaceholdersEnabled: flagValue(featureFlagsText, "formPlaceholdersEnabled"),
  ownerLegalAcceptance: false,
  legalApproved: false,
  ownerLegalReviewRequired: true,
  policyRoutePresent: Boolean(policyHtml),
  policyDisclosure: {
    titlePresent: visiblePolicyText.includes("Аналитика, cookies и технические события"),
    metricaDisclosed: /Яндекс Метрик/i.test(visiblePolicyText),
    trafficPhoneCtaTechEventsDisclosed: /посещаемость[\s\S]*клики по телефону[\s\S]*CTA[\s\S]*технические события/i.test(visiblePolicyText),
    noPiiInEventsDisclosed: /имя[\s\S]*телефон[\s\S]*email[\s\S]*текст вопроса[\s\S]*документы[\s\S]*сканы[\s\S]*реквизиты/i.test(visiblePolicyText),
    attributionParamsDisclosed: /UTM[\s\S]*yclid[\s\S]*ysclid[\s\S]*атрибуц/i.test(visiblePolicyText),
    clicksAreIntentNotLeadsDisclosed: /не подтвержденный лид[\s\S]*не принятая заявка/i.test(visiblePolicyText),
    formSubmitSuccessDisabledDisclosed: /goal_form_submit_success[\s\S]*не включен/i.test(visiblePolicyText),
    noPublicUploadDisclosed: /нет публичной загрузки документов/i.test(visiblePolicyText),
    browserCookieRestrictionDisclosed: /настройки браузера/i.test(visiblePolicyText),
    ownerLegalGateDisclosed: /owner\/legal acceptance[\s\S]*отдельным gate/i.test(visiblePolicyText)
  },
  cookieNotice: {
    componentPresent: fs.existsSync(path.join(root, "components", "CookieAnalyticsNotice.tsx")),
    guardedByFeatureFlag: /siteFeatureFlags\.cookieNoticeEnabled/.test(cookieNoticeText),
    usesLocalStorage: /localStorage/.test(cookieNoticeText),
    storesDismissalOnly: /dismissed/.test(cookieNoticeText) && !/name|phone|email|message|document|scan|requisites/.test(cookieNoticeText.match(/localStorage[\s\S]*/)?.[0] ?? ""),
    policyLinkPresent: /href="\/policy\/"/.test(cookieNoticeText),
    dismissButtonPresent: /Понятно/.test(cookieNoticeText),
    nonBlockingRolePresent: /role="status"|aria-label=/.test(cookieNoticeText),
    noExternalScript: noPattern(/<script|mc\.yandex|ym\(|fetch\s*\(|sendBeacon|XMLHttpRequest/i, cookieNoticeText),
    renderedOrHydrationMarkerPresent:
      stripTags(homeHtml).includes("Сайт использует техническую аналитику и cookies") ||
      /CookieAnalyticsNotice/.test(layoutText) ||
      cookieNoticeText.includes("Сайт использует техническую аналитику и cookies")
  },
  trackingNoPii: {
    safePayloadAllowlistChecked: forbiddenKeysCovered,
    typedMetricaBridgePresent: /metrica\.call\(window,\s*109869928,\s*"reachGoal"/.test(read(path.join(root, "lib", "tracking", "tracking-adapter.ts"))),
    arbitraryYmCallsForbidden: /Direct ym\(\.\.\.\)/.test(noPiiCheckText) || /Direct ym/.test(noPiiCheckText),
    directYmOutsideLayout,
    noFormFieldValueReads: noPattern(/\bFormData\b|querySelector|querySelectorAll|\.(?:value|files)\b/, eventRuntimeText),
    goalFormSubmitSuccessNotEmitted: noPattern(/goal_form_submit_success/, eventRuntimeText),
    attributionOnlyParamsPresent: /utm_source/.test(eventContextText) && /yclid/.test(eventContextText) && /ysclid/.test(eventContextText)
  },
  formAudit: {
    formPlaceholderCount,
    expectedFormPlaceholderCount: formRoutes.length,
    formActionCount,
    methodPostCount,
    submitControlCount,
    fileInputCount,
    noUpload: fileInputCount === 0 && noPattern(/<input\b[^>]*type=["']file["']/i, scannedRuntimeText),
    noBackendEndpoint:
      !fs.existsSync(path.join(root, "app", "api")) &&
      listFiles(path.join(root, "app")).filter((file) => /[\\/]route\.(ts|js|mjs)$/i.test(file)).length === 0 &&
      formActionCount === 0 &&
      methodPostCount === 0,
    noFalseSuccessCopy: noPattern(/заявка отправлена|заявка принята|успешно отправ/i, renderedVisibleText)
  },
  safetyAudit: {
    noWebhook: noPattern(/webhook/i, scannedRuntimeText),
    noSecrets: noPattern(/OPENAI_API_KEY|sk-[A-Za-z0-9_-]{12,}|token=|secret=|-----BEGIN/i, scannedRuntimeText),
    noTelegramMaxDeepLinks: noPattern(/t\.me\/|telegram\.me\/|max:\/\//i, scannedRuntimeText),
    noPrices: noPattern(/скидк|цена|стоимость/i, renderedVisibleText),
    noGuarantees: noPattern(/100% результат|гарантируем|без отказа|срочно за 1 день/i, renderedVisibleText),
    noReviewsRatings: noPattern(/AggregateRating|ReviewRating|ReviewSchema|["@']@type["@']\s*:\s*["@']Review["@']|отзывы|рейтинг/i, scannedRuntimeText)
  },
  analyticsProviderStatus: {
    genericAnalyticsDisabled: flagValue(featureFlagsText, "analyticsEnabled") === false,
    metricaCounterPresent: /mc\.yandex|ym\(109869928,\s*'init'/.test(layoutText),
    noMetricaFormSuccessGoal: noPattern(/goal_form_submit_success/, eventRuntimeText)
  },
  reviewedRoutes: p0Routes,
  remainingHold: [
    "owner/legal acceptance",
    "final legal wording",
    "live forms",
    "CRM submission and success goals",
    "public upload",
    "paid traffic",
    "Telegram/MAX public messaging links",
    "local profiles publication",
    "prices, guarantees, deadlines, reviews, ratings, legal identifiers and office/floor/hours"
  ]
};

ensureDir(ownerLegalDir);
writeJson(path.join(ownerLegalDir, "owner-legal-privacy-proof.json"), proof);
writeText(
  path.join(ownerLegalDir, "owner-legal-privacy-proof-summary.md"),
  `# Owner Legal Privacy Proof\n\nMode: ${mode}\n\nVerdict: ${verdict}\n\nSite commit: ${siteCommit ?? "unknown"}\n\nSource commit: ${sourceCommit ?? "not available in standalone run"}\n\nPolicy analytics/cookies disclosure: ${
    Object.values(proof.policyDisclosure).every(Boolean) ? "PASS" : "FAIL"
  }\n\nCookie notice: ${Object.values(proof.cookieNotice).every(Boolean) ? "PASS" : "FAIL"}\n\nTracking no-PII guard: ${
    proof.trackingNoPii.safePayloadAllowlistChecked &&
    proof.trackingNoPii.typedMetricaBridgePresent &&
    proof.trackingNoPii.directYmOutsideLayout.length === 0 &&
    proof.trackingNoPii.noFormFieldValueReads &&
    proof.trackingNoPii.goalFormSubmitSuccessNotEmitted
      ? "PASS"
      : "FAIL"
  }\n\nForms/CRM/upload status: formsLive=${proof.formsLive}, crmEnabled=${proof.crmEnabled}, crmSuccessEnabled=${proof.crmSuccessEnabled}, upload=${proof.formAudit.noUpload ? "disabled" : "found"}\n\nOwner/legal acceptance: required\n`
);

console.log(`Owner/legal/privacy evidence generated in ${path.relative(root, ownerLegalDir)}`);
