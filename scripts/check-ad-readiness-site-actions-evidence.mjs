import { readFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const evidencePath = path.join(ROOT, "evidence/ads/ad-readiness-site-actions-proof.json");
const evidence = JSON.parse(readFileSync(evidencePath, "utf8"));

const failures = [];
const warnings = [];

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

const publicLandingPages = evidence.routeAudit.pages.filter((page) => {
  if (!page.exists) return false;
  if (["blog", "faq", "internal", "system", "policy", "about"].includes(page.pageType)) return false;
  return page.inSitemap && page.indexable;
});

for (const route of evidence.routeAudit.requiredRoutes) {
  const page = evidence.routeAudit.pages.find((item) => item.route === route);
  if (!page && route !== "/news/" && route !== "/internal/") {
    fail(`required route not audited: ${route}`);
  }
}

for (const route of evidence.routeAudit.sitemapRoutes) {
  if (!evidence.routeAudit.builtRoutes.includes(route)) {
    fail(`route expected in sitemap is not built: ${route}`);
  }
}

for (const page of publicLandingPages) {
  if (!page.title) fail(`public landing has no title: ${page.route}`);
  if (!page.description) fail(`public landing has no description: ${page.route}`);
  if (!page.canonical) fail(`public landing has no canonical: ${page.route}`);
  if (!page.h1?.length) fail(`public landing has no H1: ${page.route}`);
  if (page.h1Count > 1) fail(`public landing has multiple H1: ${page.route}`);
  if (!page.primaryCta) fail(`public landing has no primary CTA: ${page.route}`);
  if (!page.phoneLinkPresent && !page.contactLinkPresent) fail(`public landing has no phone/contact path: ${page.route}`);
  if (!page.policyLinkPresent) fail(`public landing has no policy link: ${page.route}`);
}

const policyPage = evidence.routeAudit.pages.find((page) => page.route === "/policy/");
if (!policyPage?.exists) fail("policy route missing");

if (evidence.trackingNoPiiState.metrikaCounter !== "ABSENT") {
  if (evidence.trackingNoPiiState.cookieNotice !== "PRESENT") fail("cookie notice missing when Metrika is enabled");
  if (evidence.trackingNoPiiState.policyDisclosure !== "PRESENT") fail("policy disclosure missing when Metrika is enabled");
}

if (evidence.actionAudit.brokenLinks.length > 0) {
  fail(`broken internal links exist: ${evidence.actionAudit.brokenLinks.length}`);
}
if (evidence.actionAudit.emptyHrefActions.length > 0) {
  fail(`empty href actions exist: ${evidence.actionAudit.emptyHrefActions.length}`);
}
if (evidence.actionAudit.wrongTelLinks.length > 0) {
  fail(`wrong tel links exist: ${evidence.actionAudit.wrongTelLinks.length}`);
}

if (!["NO_PUBLIC_FORM", "PLACEHOLDER_FORMS_ONLY"].includes(evidence.crmUploadState.formsLive)) {
  fail(`formsLive=false but public live form exists: ${evidence.crmUploadState.formsLive}`);
}
if (evidence.crmUploadState.crm !== "NO_CRM_WEBHOOK_FOUND") fail(`CRM disabled but webhook/endpoint exists: ${evidence.crmUploadState.crm}`);
if (evidence.crmUploadState.upload !== "NO_PUBLIC_UPLOAD") fail(`file upload exists: ${evidence.crmUploadState.upload}`);
if (evidence.crmUploadState.falseSuccess !== "NO_FALSE_SUCCESS_FOUND") fail(`false success text exists: ${evidence.crmUploadState.falseSuccess}`);

for (const finding of evidence.forbiddenScan.failingFindings) {
  fail(`forbidden runtime finding ${finding.id} in ${finding.file}`);
}

if (evidence.trackingNoPiiState.getClientID !== "ABSENT") fail("getClientID is present");
if (evidence.trackingNoPiiState.tagManager !== "ABSENT") fail("Tag Manager is present");
if (evidence.trackingNoPiiState.offlineConversions !== "ABSENT") fail("offline conversion marker is present");
if (evidence.trackingNoPiiState.formSubmitSuccessGoal === "PRESENT_BLOCKER_WHILE_FORMS_OFF") {
  fail("form submit success goal is present while forms/CRM are disabled");
}

const usable = [
  ...evidence.yandexDirectRiskReview.allowedLimitedTestCandidates,
  ...evidence.yandexDirectRiskReview.readyWithCopyReview
];
if (usable.length === 0) fail("no routes qualify as READY_WITH_COPY_REVIEW or READY_FOR_LIMITED_AD_TEST");

if (evidence.trackingNoPiiState.webvisor !== "ABSENT") warn(`Webvisor requires owner/legal decision: ${evidence.trackingNoPiiState.webvisor}`);
if (evidence.trackingNoPiiState.ecommerce !== "ABSENT") warn(`Ecommerce marker requires owner/legal decision: ${evidence.trackingNoPiiState.ecommerce}`);
if (evidence.trackingNoPiiState.reachGoal !== "ABSENT") warn(`reachGoal requires LK/no-PII confirmation: ${evidence.trackingNoPiiState.reachGoal}`);
if (evidence.trackingNoPiiState.formSubmitSuccessGoal === "DOCUMENTED_DISABLED_IN_POLICY") {
  warn("goal_form_submit_success appears only as disabled policy disclosure");
}
if (evidence.yandexBusinessReadiness.profileConfirmation !== "CONFIRMED") warn("Yandex Business profile is not confirmed in repo evidence");
if (evidence.routeAudit.sourceRegistryRoutesMissingFromCurrentStaticContour.length > 0) {
  warn(`source registry routes missing from current static contour: ${evidence.routeAudit.sourceRegistryRoutesMissingFromCurrentStaticContour.join(", ")}`);
}
if (evidence.finalVerdict !== "AD_READINESS_ACTIONS_AUDIT_COMPLETE_LIMITED_TEST_READY") {
  warn(`final verdict is not launch-ready: ${evidence.finalVerdict}`);
}

for (const message of warnings) console.warn(`WARN: ${message}`);

if (failures.length > 0) {
  for (const message of failures) console.error(`FAIL: ${message}`);
  process.exit(1);
}

console.log("Ad readiness site actions evidence check passed.");
console.log(`Warnings: ${warnings.length}`);
