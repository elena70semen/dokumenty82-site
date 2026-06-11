import path from "node:path";
import { evidenceDir, p0Routes, read } from "./evidence-utils.mjs";

const proof = JSON.parse(read(path.join(evidenceDir, "accessibility", "accessibility-proof.json")));
const issues = [];

if (proof.status !== "passed") issues.push("accessibility proof is not passed");
if (proof.routes?.length !== p0Routes.length) issues.push(`route count mismatch: ${proof.routes?.length}`);

for (const route of proof.routes ?? []) {
  if (!route.passed) issues.push(`accessibility failed for ${route.route}: ${(route.failures ?? []).join("; ")}`);
  if (route.axeUsed) issues.push("unexpected axeUsed true in DOM-only proof");
}

if (issues.length) {
  console.error("Accessibility evidence check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("PASS accessibility evidence: DOM-based checks verified for P0 routes.");
