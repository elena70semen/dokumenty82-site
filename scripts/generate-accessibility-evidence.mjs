import path from "node:path";
import {
  attrValues,
  countMatches,
  evidenceDir,
  extractH1Text,
  findDuplicateIds,
  formRoutes,
  p0Routes,
  read,
  routeSummaryLine,
  routeToHtmlFile,
  stripTags,
  writeJson,
  writeText
} from "./evidence-utils.mjs";

const accessibilityDir = path.join(evidenceDir, "accessibility");

function routeAccessibilityProof(route) {
  const html = read(routeToHtmlFile(route));
  const visible = stripTags(html);
  const h1Count = countMatches(html, /<h1\b/gi);
  const headings = [...html.matchAll(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map((match) => stripTags(match[1]));
  const formHtml = html.match(/<form\b[\s\S]*?<\/form>/i)?.[0] ?? "";
  const formControlCount = countMatches(formHtml, /<(input|textarea|select)\b/gi);
  const labelCount = countMatches(formHtml, /<label\b/gi);
  const buttons = [...html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gi)].map((match) => stripTags(match[1]));
  const links = [...html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)].map((match) => stripTags(match[1]));
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  const duplicateIds = findDuplicateIds(html);
  const failures = [];

  if (h1Count !== 1) failures.push(`h1 count ${h1Count}`);
  if (!extractH1Text(html)) failures.push("empty h1");
  if (!/<main\b/i.test(html)) failures.push("missing main landmark");
  if (!/<header\b/i.test(html)) failures.push("missing header");
  if (!/<nav\b/i.test(html)) failures.push("missing nav");
  if (!/<footer\b/i.test(html)) failures.push("missing footer");
  if (headings.some((heading) => !heading)) failures.push("empty heading");
  if (formRoutes.includes(route) && formControlCount > labelCount) failures.push("form controls without labels");
  if (buttons.some((button) => !button)) failures.push("button without accessible text");
  if (links.some((link) => !link)) failures.push("link without text");
  if (images.some((tag) => !/\balt=["'][^"']*["']/i.test(tag))) failures.push("image without alt");
  if (duplicateIds.length) failures.push(`duplicate ids: ${duplicateIds.join(", ")}`);
  if (/tabindex=["']-1["'][^>]*(?:button|input|textarea|select|a)/i.test(html)) failures.push("focusable control hidden from tab order");

  return {
    route,
    h1Count,
    h1Text: extractH1Text(html),
    mainLandmarkExists: /<main\b/i.test(html),
    navOrHeaderExists: /<header\b/i.test(html) && /<nav\b/i.test(html),
    footerExists: /<footer\b/i.test(html),
    formControlCount,
    labelCount,
    buttonsHaveNames: buttons.every(Boolean),
    linksHaveText: links.every(Boolean),
    imagesHaveAlt: images.every((tag) => /\balt=["'][^"']*["']/i.test(tag)),
    emptyHeadings: headings.filter((heading) => !heading),
    duplicateIds,
    skipLinkExists: attrValues(html, "href").includes("#main-content"),
    axeUsed: false,
    proofMode: "AXE_NOT_AVAILABLE_DOM_BASED_CHECK_ONLY",
    passed: failures.length === 0,
    failures
  };
}

const routes = p0Routes.map(routeAccessibilityProof);
const data = {
  status: routes.every((route) => route.passed) ? "passed" : "failed",
  generatedAt: new Date().toISOString(),
  axeUsed: false,
  note: "AXE_NOT_AVAILABLE_DOM_BASED_CHECK_ONLY",
  routes
};

writeJson(path.join(accessibilityDir, "accessibility-proof.json"), data);
writeText(
  path.join(accessibilityDir, "summary.md"),
  `# Accessibility Proof\n\nStatus: ${data.status}\n\nAxe used: no\n\nDOM-based checks: yes\n\nNote: AXE_NOT_AVAILABLE_DOM_BASED_CHECK_ONLY\n\nRoutes checked: ${routes.length}\n\n${routes.map((route) => routeSummaryLine(route.route, route)).join("\n")}\n`
);

console.log("Accessibility evidence generated.");
