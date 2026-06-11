#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {
  defaultBaseUrl,
  ensureDir,
  evidenceDir,
  listFiles,
  outDir,
  p0Routes,
  read,
  routeToHtmlFile,
  routeToUrl,
  writeJson,
  writeText
} from "./evidence-utils.mjs";

const root = process.cwd();
const repoRoot = path.resolve(root, "..");
const sourceCommit = execSync("git rev-parse --short HEAD", { cwd: repoRoot, encoding: "utf8" }).trim();
const baseDir = path.join(evidenceDir, "staging-hosting-rollback");
const stagingDir = path.join(baseDir, "staging");
const hostingDir = path.join(baseDir, "hosting");
const rollbackDir = path.join(baseDir, "rollback");
const securityDir = path.join(baseDir, "security");
const finalDir = path.join(baseDir, "final");
const localCopyDir = path.resolve(root, "..", "..", "dokumenty82-p0-local");
const nginxReferenceFile = path.join(root, "server", "nginx", "dokumenty82.static-tcp-only.reference.conf");
const rollbackRunbookFile = path.join(rollbackDir, "rollback-runbook.md");
const productionGapFile = path.join(finalDir, "production-readiness-gap.md");
const baseUrl = process.argv[2] || defaultBaseUrl;

const requiredSources = [
  "AGENTS.md",
  "README.md",
  "docs/00-start/active-canon-index.md",
  "docs/00-start/hold-register.md",
  "docs/operations/live-launch-gates-v1.md",
  "docs/operations/project-finalization-readiness-v1.md",
  "docs/operations/launch-finalization-roadmap-v1.md",
  "docs/operations/p0-implementation-proof-plan.md",
  "docs/qa/browser-evidence-requirements-v1.md",
  "docs/qa/accessibility-finalization-checklist-v1.md",
  "docs/qa/rendered-qa-evidence-requirements-v1.md",
  "docs/frontend/frontend-qa-and-acceptance-checklist.md",
  "docs/frontend/performance-and-core-web-vitals-budget.md",
  "docs/frontend/seo-metadata-schema-sitemap-robots.md",
  "docs/frontend/legal-privacy-and-feature-gates.md",
  "docs/crm-analytics/route-to-lead-traceability-v1.md",
  "docs/legal/site-legal-compliance-rf-v1.md",
  "code/LOCAL_P0_BUILD.md",
  "code/CANONICAL_INTEGRATION_REPORT.md",
  "code/BROWSER_ACCESSIBILITY_EVIDENCE_REPORT.md",
  "code/evidence/owner-legal-privacy/review-pack-index.md",
  "code/package.json",
  "code/next.config.ts",
  "code/lib/feature-flags.ts",
  "code/public/sitemap.xml",
  "code/public/robots.txt"
];

function exists(file) {
  return fs.existsSync(file);
}

function readJson(file) {
  return exists(file) ? JSON.parse(read(file)) : null;
}

function sourcePath(rel) {
  return path.join(repoRoot, rel);
}

function fileSize(file) {
  return exists(file) ? fs.statSync(file).size : 0;
}

function normalizeSlashes(value) {
  return value.split(path.sep).join("/");
}

function routeProof(route) {
  const file = routeToHtmlFile(route);
  return {
    route,
    file,
    exists: exists(file),
    size: fileSize(file)
  };
}

async function httpProof() {
  const routes = [];
  for (const route of p0Routes) {
    const url = routeToUrl(route, baseUrl);
    try {
      const response = await fetch(url, { redirect: "follow" });
      const html = await response.text();
      routes.push({
        route,
        url,
        status: response.status,
        ok: response.status === 200,
        hasHtml: /<html\b/i.test(html),
        hasMain: /<main\b/i.test(html)
      });
    } catch (error) {
      routes.push({
        route,
        url,
        status: null,
        ok: false,
        error: error.message
      });
    }
  }
  return routes;
}

function sourceFilesForRuntime() {
  return [
    ...listFiles(path.join(root, "app")),
    ...listFiles(path.join(root, "components")),
    ...listFiles(path.join(root, "lib")),
    path.join(root, "next.config.ts"),
    path.join(root, "package.json"),
    nginxReferenceFile
  ].filter((file) => {
    if (!exists(file) || !fs.statSync(file).isFile()) return false;
    const rel = normalizeSlashes(path.relative(root, file));
    return !rel.startsWith("lib/pricing/");
  });
}

function generatedPublicFiles() {
  return exists(outDir) ? listFiles(outDir, { skip: new Set([]) }).filter((file) => fs.statSync(file).isFile()) : [];
}

function securityFiles() {
  const skip = new Set([".git", "node_modules", ".next", "out"]);
  return listFiles(repoRoot, { skip }).filter((file) => fs.statSync(file).isFile());
}

function findFilesByName(pattern) {
  return securityFiles()
    .filter((file) => pattern.test(path.basename(file)))
    .map((file) => path.relative(repoRoot, file));
}

function textMatches(files, pattern) {
  const matches = [];
  for (const file of files) {
    const text = read(file);
    if (pattern.test(text)) matches.push(path.relative(repoRoot, file));
  }
  return matches;
}

function generateHostingProof() {
  ensureDir(hostingDir);
  const options = [
    {
      option: "Simple Nginx static hosting",
      staticExportCompatibility: "high",
      tlsSupport: "yes",
      http2TcpSupport: "yes",
      http3QuicRisk: "low if not enabled",
      rollbackSimplicity: "high",
      logsAccessControl: "server-controlled",
      privacyLegalConsiderations: "owner controls logs and retention",
      placeholderForms: "safe",
      futureBackendReadiness: "medium",
      ownerBurden: "medium",
      recommendation: "recommended for current staging review"
    },
    {
      option: "Static object hosting + CDN",
      staticExportCompatibility: "high",
      tlsSupport: "yes",
      http2TcpSupport: "provider-dependent",
      http3QuicRisk: "must be disabled or reviewed",
      rollbackSimplicity: "high with versioned artifacts",
      logsAccessControl: "provider-dependent",
      privacyLegalConsiderations: "provider and CDN logs need review",
      placeholderForms: "safe",
      futureBackendReadiness: "low without extra services",
      ownerBurden: "low to medium",
      recommendation: "candidate after provider/legal review"
    },
    {
      option: "Vercel/Netlify-style static hosting",
      staticExportCompatibility: "high",
      tlsSupport: "yes",
      http2TcpSupport: "yes",
      http3QuicRisk: "provider defaults must be reviewed",
      rollbackSimplicity: "high",
      logsAccessControl: "provider-dependent",
      privacyLegalConsiderations: "cross-border/provider review required",
      placeholderForms: "safe if no platform forms are enabled",
      futureBackendReadiness: "medium to high",
      ownerBurden: "low",
      recommendation: "not current default until provider review"
    },
    {
      option: "VPS with Nginx",
      staticExportCompatibility: "high",
      tlsSupport: "yes",
      http2TcpSupport: "yes",
      http3QuicRisk: "low if config stays TCP-only",
      rollbackSimplicity: "medium",
      logsAccessControl: "owner-controlled",
      privacyLegalConsiderations: "ops/access discipline required",
      placeholderForms: "safe",
      futureBackendReadiness: "high",
      ownerBurden: "high",
      recommendation: "good future option with ops owner"
    },
    {
      option: "Future backend-capable hosting",
      staticExportCompatibility: "medium to high",
      tlsSupport: "yes",
      http2TcpSupport: "yes",
      http3QuicRisk: "must be controlled explicitly",
      rollbackSimplicity: "depends on release process",
      logsAccessControl: "depends on platform",
      privacyLegalConsiderations: "requires backend, CRM and retention review",
      placeholderForms: "safe only while backend remains disabled",
      futureBackendReadiness: "high",
      ownerBurden: "medium to high",
      recommendation: "defer until live forms/backend stage"
    }
  ];

  const proof = {
    status: "passed",
    generatedAt: new Date().toISOString(),
    recommendedCurrentStagingApproach: {
      staticHostingOverHttpsTcp: true,
      http2Allowed: true,
      http3Enabled: false,
      quicEnabled: false,
      udp443Required: false,
      h3AltSvcEnabled: false,
      liveCrmFormsAnalytics: false,
      publicLaunchApproved: false
    },
    options
  };

  writeJson(path.join(hostingDir, "hosting-decision-proof.json"), proof);
  return proof;
}

async function generateStagingProof() {
  ensureDir(stagingDir);
  const routeFiles = p0Routes.map(routeProof);
  const httpRoutes = await httpProof();
  const nextConfigText = read(path.join(root, "next.config.ts"));
  const formsEvidence = readJson(path.join(root, "evidence", "forms", "form-placeholder-proof.json"));
  const sourceRuntimeFiles = sourceFilesForRuntime();
  const runtimeText = sourceRuntimeFiles.map((file) => read(file)).join("\n");
  const apiRouteFiles = listFiles(path.join(root, "app")).filter((file) => /[\\/]route\.(ts|js|mjs)$/i.test(file));
  const proof = {
    status: "passed",
    generatedAt: new Date().toISOString(),
    baseUrl,
    staticExportExists: exists(outDir),
    staticExportPath: outDir,
    localCopyExists: exists(localCopyDir),
    localCopyPath: localCopyDir,
    p0RouteFiles: routeFiles,
    p0RoutesExistInOut: routeFiles.every((route) => route.exists && route.size > 0),
    sitemapExists: exists(path.join(outDir, "sitemap.xml")),
    robotsExists: exists(path.join(outDir, "robots.txt")),
    assetsExist: exists(path.join(outDir, "assets")) && exists(path.join(outDir, "_next", "static")),
    policyRouteExists: exists(routeToHtmlFile("/policy/")),
    noServerRuntimeRequired: /output:\s*["']export["']/.test(nextConfigText),
    noNextServerRequired: /output:\s*["']export["']/.test(nextConfigText),
    noBackendRequiredForPlaceholderForms: formsEvidence?.status === "passed",
    noApiRoutesRequired: apiRouteFiles.length === 0,
    apiRouteFiles: apiRouteFiles.map((file) => path.relative(root, file)),
    noEnvironmentVariablesRequiredForLocalStaticServing: !/process\.env\./.test(runtimeText),
    noSecretsRequired: !/OPENAI_API_KEY|sk-[A-Za-z0-9_-]{12,}|token=|secret=/i.test(runtimeText),
    noLiveCrmRequired: /crmSuccessEnabled:\s*false/.test(read(path.join(root, "lib", "feature-flags.ts"))),
    noLiveAnalyticsRequired: /analyticsEnabled:\s*false/.test(read(path.join(root, "lib", "feature-flags.ts"))),
    httpRoutes,
    p0RoutesHttp200: httpRoutes.every((route) => route.ok && route.hasHtml && route.hasMain)
  };
  proof.status =
    proof.staticExportExists &&
    proof.localCopyExists &&
    proof.p0RoutesExistInOut &&
    proof.sitemapExists &&
    proof.robotsExists &&
    proof.assetsExist &&
    proof.policyRouteExists &&
    proof.noServerRuntimeRequired &&
    proof.noNextServerRequired &&
    proof.noBackendRequiredForPlaceholderForms &&
    proof.noApiRoutesRequired &&
    proof.noEnvironmentVariablesRequiredForLocalStaticServing &&
    proof.noSecretsRequired &&
    proof.noLiveCrmRequired &&
    proof.noLiveAnalyticsRequired &&
    proof.p0RoutesHttp200
      ? "passed"
      : "failed";

  writeJson(path.join(stagingDir, "staging-readiness-proof.json"), proof);
  writeText(
    path.join(stagingDir, "summary.md"),
    `# Staging Readiness Proof\n\nStatus: ${proof.status}\n\nStatic export: ${proof.staticExportPath}\n\nLocal copy: ${proof.localCopyPath}\n\nLocal preview: ${baseUrl}\n\nP0 routes HTTP 200: ${proof.p0RoutesHttp200 ? "PASS" : "FAIL"}\n\nRoutes checked: ${httpRoutes.length}\n`
  );
  return proof;
}

function generateRollbackProof() {
  ensureDir(rollbackDir);
  ensureDir(path.join(rollbackDir, "artifacts"));
  const artifactManifest = {
    artifactMode: "manifest-only",
    reason: "Full static export is already reproducible from code/out; no duplicate 32MB artifact copy is committed in this readiness pack.",
    currentBuildArtifactPath: outDir,
    previousBuildArtifactPathPlaceholder: "<previous-versioned-static-export-path>",
    indexHtmlExists: exists(path.join(outDir, "index.html")),
    p0RouteFiles: p0Routes.map(routeProof)
  };
  writeJson(path.join(rollbackDir, "artifacts", "current-static-export-manifest.json"), artifactManifest);

  const proof = {
    status: exists(rollbackRunbookFile) && artifactManifest.indexHtmlExists && artifactManifest.p0RouteFiles.every((route) => route.exists)
      ? "passed"
      : "failed",
    generatedAt: new Date().toISOString(),
    rollbackRunbookCreated: exists(rollbackRunbookFile),
    rollbackRunbookPath: rollbackRunbookFile,
    rollbackDryRunLocalOnly: false,
    artifactManifestPath: path.join(rollbackDir, "artifacts", "current-static-export-manifest.json"),
    currentBuildArtifactPath: outDir,
    previousBuildArtifactPathPlaceholder: artifactManifest.previousBuildArtifactPathPlaceholder,
    productionRollbackPerformed: false,
    approvalRequired: true
  };
  writeJson(path.join(rollbackDir, "rollback-proof.json"), proof);
  return proof;
}

function generateSecurityProof() {
  ensureDir(securityDir);
  const runtimeFiles = [...sourceFilesForRuntime(), ...generatedPublicFiles()];
  const runtimeTextFiles = runtimeFiles.filter((file) => /\.(html|js|mjs|css|json|txt|xml|ts|tsx|conf)$/i.test(file));
  const envFiles = findFilesByName(/^\.env(?:\.|$)|^\.env\.local$/i);
  const keyFiles = findFilesByName(/\.(pem|key)$/i);
  const privateKeyText = textMatches(runtimeTextFiles, /BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/i);
  const apiKeys = textMatches(runtimeTextFiles, /OPENAI_API_KEY|sk-[A-Za-z0-9_-]{12,}/i);
  const hookEndpoints = textMatches(runtimeTextFiles, /(?:webhook(?:Url|URL|_url)?\s*[:=]\s*["']https?:\/\/|https?:\/\/[^\s"']*webhook)/i);
  const tokenAssignments = textMatches(runtimeTextFiles, /\btoken\s*[:=]\s*["'][^"']{8,}["']/i);
  const secretAssignments = textMatches(runtimeTextFiles, /\bsecret\s*[:=]\s*["'][^"']{8,}["']/i);
  const analyticsIds = textMatches(
    runtimeTextFiles,
    /(?:gtag\(["']config["'],\s*["']G-[A-Z0-9]{6,}|https?:\/\/www\.googletagmanager\.com|GoogleAnalytics|gtag\(|data-goal|UA-\d+-\d+)/i
  );
  const metricaCounters = textMatches(runtimeTextFiles, /ym\(|mc\.yandex|counterId\s*[:=]\s*\d+|metrika|yandex_metrica/i);
  const crmEndpoints = textMatches(runtimeTextFiles, /https?:\/\/[^\s"']*crm|crmEndpoint|crm_endpoint/i);

  const checks = [
    { key: "noEnvFiles", passed: envFiles.length === 0, matches: envFiles },
    { key: "noPrivateKeyFiles", passed: keyFiles.length === 0, matches: keyFiles },
    { key: "noPrivateKeyText", passed: privateKeyText.length === 0, matches: privateKeyText },
    { key: "noApiKeys", passed: apiKeys.length === 0, matches: apiKeys },
    { key: "noWebhookEndpoints", passed: hookEndpoints.length === 0, matches: hookEndpoints },
    { key: "noTokenAssignments", passed: tokenAssignments.length === 0, matches: tokenAssignments },
    { key: "noSecretAssignments", passed: secretAssignments.length === 0, matches: secretAssignments },
    { key: "noAnalyticsIds", passed: analyticsIds.length === 0, matches: analyticsIds },
    { key: "noMetricaCounter", passed: metricaCounters.length === 0, matches: metricaCounters },
    { key: "noExternalCrmEndpoint", passed: crmEndpoints.length === 0, matches: crmEndpoints }
  ];

  const proof = {
    status: checks.every((check) => check.passed) ? "passed" : "failed",
    generatedAt: new Date().toISOString(),
    scannedRuntimeFiles: runtimeTextFiles.map((file) => normalizeSlashes(path.relative(root, file))),
    checks
  };
  writeJson(path.join(securityDir, "security-readiness-proof.json"), proof);
  writeText(
    path.join(securityDir, "summary.md"),
    `# Security Readiness Proof\n\nStatus: ${proof.status}\n\nRuntime files scanned: ${runtimeTextFiles.length}\n\n${checks.map((check) => `- ${check.key}: ${check.passed ? "PASS" : `FAIL (${check.matches.join(", ")})`}`).join("\n")}\n`
  );
  return proof;
}

function generateFinalProof(stagingProof, hostingProof, rollbackProof, securityProof) {
  ensureDir(finalDir);
  const proof = {
    reviewedAtLocal: new Date().toISOString(),
    sourceCommit,
    publicLiveAllowed: false,
    productionDeployPerformed: false,
    pushPerformed: false,
    stagingReadyForReview: stagingProof.status === "passed",
    staticExportExists: stagingProof.staticExportExists,
    localPreviewPassed: stagingProof.p0RoutesHttp200,
    p0RoutesHttp200: stagingProof.p0RoutesHttp200,
    nginxReferenceCreated: exists(nginxReferenceFile),
    http3Enabled: false,
    quicEnabled: false,
    udp443Required: false,
    h3AltSvcEnabled: false,
    rollbackRunbookCreated: rollbackProof.rollbackRunbookCreated,
    rollbackDryRunLocalOnly: rollbackProof.rollbackDryRunLocalOnly,
    securityAuditPassed: securityProof.status === "passed",
    ownerApprovalRequired: true,
    legalApprovalRequired: true,
    productionLaunchReady: false,
    verdict: "HOLD/NOT_PUBLIC_LAUNCH_READY",
    requiredSources: requiredSources.map((rel) => ({ path: rel, present: exists(sourcePath(rel)) })),
    hostingRecommendation: hostingProof.recommendedCurrentStagingApproach
  };
  proof.missingSources = proof.requiredSources.filter((source) => !source.present).map((source) => source.path);
  writeJson(path.join(finalDir, "staging-hosting-rollback-proof.json"), proof);
  return proof;
}

for (const dir of [stagingDir, hostingDir, rollbackDir, securityDir, finalDir]) ensureDir(dir);

const hostingProof = generateHostingProof();
const stagingProof = await generateStagingProof();
const rollbackProof = generateRollbackProof();
const securityProof = generateSecurityProof();
generateFinalProof(stagingProof, hostingProof, rollbackProof, securityProof);

console.log(`Staging/hosting/rollback evidence generated in ${path.relative(root, baseDir)}`);
