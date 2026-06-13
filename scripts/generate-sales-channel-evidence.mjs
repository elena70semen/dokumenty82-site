#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { salesChannels } from "../lib/channels/sales-channel-registry.mjs";

const root = process.cwd();
const evidenceDir = path.join(root, "evidence/sales-channels");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function read(rel) {
  const file = path.join(root, rel);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function uniq(values) {
  return [...new Set(values.filter(Boolean))];
}

function normalizeRoute(route) {
  if (route === "/" || route === "/policy") return route;
  return route.endsWith("/") ? route : `${route}/`;
}

function collectApprovedRoutes() {
  const routesText = read("lib/routes.ts");
  const contentText = read("lib/content.ts");
  const explicitRoutes = [...routesText.matchAll(/path:\s*"([^"]+)"/g)].map((match) => match[1]);
  const contentRoutes = [...contentText.matchAll(/href:\s*"([^"]+)"/g)]
    .map((match) => match[1])
    .filter((route) => route.startsWith("/"));

  return uniq([...explicitRoutes, ...contentRoutes]).map(normalizeRoute).sort();
}

function collectBlockedRoutes() {
  const routesText = read("lib/routes.ts");
  const blocked = [];

  for (const match of routesText.matchAll(/path:\s*"([^"]+)"[\s\S]*?(?=\n\s*}\n|\n\s*},)/g)) {
    const block = match[0];
    if (/indexing:\s*"noindex"/.test(block) || /includeInSitemap:\s*false/.test(block) || /approvedInRouteRegistry:\s*false/.test(block)) {
      blocked.push(normalizeRoute(match[1]));
    }
  }

  return uniq(blocked).sort();
}

function collectFlags() {
  const flagsText = read("lib/feature-flags.ts");
  return Object.fromEntries([...flagsText.matchAll(/(\w+):\s*(true|false)/g)].map((match) => [match[1], match[2] === "true"]));
}

const approvedRoutes = collectApprovedRoutes();
const blockedRoutes = collectBlockedRoutes();
const flags = collectFlags();

const channels = salesChannels.map((channel) => ({
  id: channel.id,
  label: channel.label,
  status: channel.status,
  allowedLandingRoutes: channel.allowedLandingRoutes.map(normalizeRoute),
  missingRoutes: channel.allowedLandingRoutes.map(normalizeRoute).filter((route) => !approvedRoutes.includes(route)),
  blockedLandingRoutes: channel.allowedLandingRoutes.map(normalizeRoute).filter((route) => blockedRoutes.includes(route)),
  attributionRequired: channel.attributionRequired,
  crmSourceValue: channel.crmSourceValue,
  launchBlocker: channel.launchBlocker,
  stopSignal: channel.stopSignal
}));

const statusCounts = channels.reduce((acc, channel) => {
  acc[channel.status] = (acc[channel.status] ?? 0) + 1;
  return acc;
}, {});

const proof = {
  status: "generated",
  source: "lib/channels/sales-channel-registry.mjs",
  generatedAt: new Date().toISOString(),
  featureGates: {
    publicLiveAllowed: flags.publicLiveAllowed === true,
    paidTrafficAllowed: flags.paidTrafficAllowed === true,
    localProfilesPublic: flags.localProfilesPublic === true,
    analyticsEnabled: flags.analyticsEnabled === true,
    metricaEnabled: flags.metricaEnabled === true,
    crmEnabled: flags.crmEnabled === true,
    messagingEnabled: flags.messagingEnabled === true
  },
  approvedRouteCount: approvedRoutes.length,
  blockedRouteCount: blockedRoutes.length,
  channelCount: channels.length,
  statusCounts,
  channels
};

ensureDir(evidenceDir);
fs.writeFileSync(path.join(evidenceDir, "sales-channel-readiness-proof.json"), `${JSON.stringify(proof, null, 2)}\n`);
console.log(`Generated sales channel evidence for ${channels.length} channels.`);
