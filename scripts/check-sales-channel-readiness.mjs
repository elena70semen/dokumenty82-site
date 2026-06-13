#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { salesChannels, salesChannelStatuses } from "../lib/channels/sales-channel-registry.mjs";

const root = process.cwd();
const evidenceFile = path.join(root, "evidence/sales-channels/sales-channel-readiness-proof.json");
const issues = [];

function read(rel) {
  const file = path.join(root, rel);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function normalizeRoute(route) {
  if (route === "/" || route === "/policy") return route;
  return route.endsWith("/") ? route : `${route}/`;
}

function uniq(values) {
  return [...new Set(values.filter(Boolean))];
}

function assert(condition, message) {
  if (!condition) issues.push(message);
}

function collectApprovedRoutes() {
  const routesText = read("lib/routes.ts");
  const contentText = read("lib/content.ts");
  const explicitRoutes = [...routesText.matchAll(/path:\s*"([^"]+)"/g)].map((match) => match[1]);
  const contentRoutes = [...contentText.matchAll(/href:\s*"([^"]+)"/g)]
    .map((match) => match[1])
    .filter((route) => route.startsWith("/"));

  return uniq([...explicitRoutes, ...contentRoutes]).map(normalizeRoute);
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

  return uniq(blocked);
}

function collectFlags() {
  const flagsText = read("lib/feature-flags.ts");
  return Object.fromEntries([...flagsText.matchAll(/(\w+):\s*(true|false)/g)].map((match) => [match[1], match[2] === "true"]));
}

const approvedRoutes = collectApprovedRoutes();
const blockedRoutes = collectBlockedRoutes();
const flags = collectFlags();
const ids = new Set();

assert(fs.existsSync(evidenceFile), "Run npm run evidence:sales-channels before check:sales-channels.");
assert(salesChannels.length >= 16, "Expected first-wave channel registry coverage.");

for (const channel of salesChannels) {
  assert(!ids.has(channel.id), `Duplicate channel id: ${channel.id}`);
  ids.add(channel.id);
  assert(salesChannelStatuses.includes(channel.status), `Invalid status for ${channel.id}: ${channel.status}`);
  assert(Array.isArray(channel.allowedLandingRoutes) && channel.allowedLandingRoutes.length > 0, `Channel must have landing routes: ${channel.id}`);
  assert(Array.isArray(channel.allowedCtaLabels) && channel.allowedCtaLabels.length > 0, `Channel must have CTA labels: ${channel.id}`);
  assert(Boolean(channel.attributionRequired), `Channel must define attribution requirement: ${channel.id}`);
  assert(Boolean(channel.crmSourceValue), `Channel must define CRM source: ${channel.id}`);
  assert(Boolean(channel.launchBlocker), `Channel must define launch blocker: ${channel.id}`);
  assert(Boolean(channel.stopSignal), `Channel must define stop signal: ${channel.id}`);

  for (const route of channel.allowedLandingRoutes.map(normalizeRoute)) {
    assert(approvedRoutes.includes(route), `Channel ${channel.id} references missing route: ${route}`);
    assert(!blockedRoutes.includes(route), `Channel ${channel.id} must not use blocked/noindex/internal route: ${route}`);
  }
}

const paidChannels = salesChannels.filter((channel) => ["yandex_direct", "vk_paid", "dzen_paid"].includes(channel.id));
for (const channel of paidChannels) {
  if (flags.paidTrafficAllowed === false) {
    assert(channel.status !== "READY_WITH_CONDITIONS", `Paid channel must not be ready while paidTrafficAllowed=false: ${channel.id}`);
  }
}

const localChannels = ["yandex_business", "2gis", "directory"];
for (const id of localChannels) {
  const channel = salesChannels.find((item) => item.id === id);
  assert(channel?.status === "OWNER_REQUIRED", `Local channel must remain OWNER_REQUIRED: ${id}`);
}

for (const id of ["telegram_message", "max_message"]) {
  const channel = salesChannels.find((item) => item.id === id);
  assert(channel?.status === "BLOCKED", `Messaging future channel must remain BLOCKED: ${id}`);
}

const direct = salesChannels.find((channel) => channel.id === "yandex_direct");
assert(direct?.attributionRequired.includes("yclid"), "Yandex Direct must require yclid attribution.");
assert(direct?.attributionRequired.includes("utm_source=yandex_direct"), "Yandex Direct must require utm_source=yandex_direct.");

const registryText = read("lib/channels/sales-channel-registry.mjs");
for (const forbidden of [/t\.me\//i, /telegram\.me\//i, /max:\/\//i, /webhook/i, /token=/i, /secret=/i]) {
  assert(!forbidden.test(registryText), `Sales channel registry must not contain unsafe external link/secret pattern: ${forbidden}`);
}

if (issues.length > 0) {
  console.error("Sales channel readiness check failed:");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log(`PASS sales channel readiness: ${salesChannels.length} channels, routes and launch gates verified.`);
