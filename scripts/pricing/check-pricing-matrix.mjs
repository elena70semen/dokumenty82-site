import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const matrixPath = path.join(root, "lib/pricing/service-pricing-matrix.ts");
const text = fs.readFileSync(matrixPath, "utf8");

const ids = [...text.matchAll(/\bid:\s*"([^"]+)"/g)].map((match) => match[1]);
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);

const requiredIds = [
  "situation-review",
  "urgent-unclear-request",
  "otvet-na-trebovanie-ifns",
  "otvet-na-zapros-banka",
  "dokumenty-dlya-banka-115-fz",
  "deklaraciya-usn",
  "nulevaya-otchetnost-ooo",
  "nulevaya-otchetnost-ip",
  "otchetnost-elektronno",
  "nalogi-i-rezhimy",
  "ausn-krym",
  "raschet-nalogovoy-nagruzki",
  "nds-pri-usn-2026",
  "perehod-na-ausn",
  "yuridicheskiy-adres-simferopol",
  "nedostovernost-yuridicheskogo-adresa",
  "smena-yuridicheskogo-adresa-ooo",
  "smena-direktora-ooo",
  "registraciya-ooo",
  "registraciya-ip",
  "likvidaciya-ooo",
  "kadry",
  "kadrovoe-soprovozhdenie",
  "srochnoe-oformlenie-sotrudnikov",
  "soprovozhdenie",
  "buhgalterskoe-soprovozhdenie-ooo",
  "buhgalterskoe-soprovozhdenie-ip",
  "vosstanovlenie-buhucheta",
  "reporting",
  "tax-regime-diagnostics",
  "bank-115fz",
  "address-egrul-director",
  "registration-liquidation",
  "hr-documents",
  "business-support-recovery",
  "office-contacts",
  "policy-consent",
];

const missing = requiredIds.filter((id) => !ids.includes(id));

const forbiddenPatterns = [
  [/publicStatus:\s*"PUBLIC_APPROVED"/, "actual PUBLIC_APPROVED publicStatus"],
  [/quoteStatus:\s*"APPROVED_INTERNAL"/, "actual APPROVED_INTERNAL quoteStatus"],
  [
    /contractStatus:\s*"APPROVED_INTERNAL"/,
    "actual APPROVED_INTERNAL contractStatus",
  ],
  [/\bvalue:\s*/, "actual value field"],
  [/\bmin:\s*/, "actual min field"],
  [/\bmax:\s*/, "actual max field"],
];

const issues = [];

if (duplicates.length > 0) {
  issues.push(`Duplicate service IDs: ${[...new Set(duplicates)].join(", ")}`);
}

if (missing.length > 0) {
  issues.push(`Missing service IDs: ${missing.join(", ")}`);
}

for (const [pattern, label] of forbiddenPatterns) {
  if (pattern.test(text)) {
    issues.push(`Forbidden matrix content: ${label}`);
  }
}

if (!/safePublicWording/.test(text)) {
  issues.push("safePublicWording is missing");
}

if (!/forbiddenPublicWording/.test(text)) {
  issues.push("forbiddenPublicWording is missing");
}

if (issues.length > 0) {
  console.error("Pricing matrix smoke check failed:");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log(
  `Pricing matrix smoke check passed: ${ids.length} service IDs, ${requiredIds.length} required IDs covered.`,
);
