#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname, "..");
const failDirs = ["code/app", "code/components", "code/public/assets/brand"];
const warnDirs = ["AGENTS.md", "README.md", "docs", "code/lib/pricing"];
const forbidden = /(цена|стоимость|скидк|тариф|руб|₽|пакет|прайс|гарант|срок|за 1 день|100%|отзыв|рейтинг|кейс|официальн|государственн|гос|решим любую|гарантируем|PUBLIC_READY|LAUNCH_READY|APPROVED|PRICE_APPROVED|READY_TO_PUBLISH|CLIENT_READY_KP|манипул|давлен|надавить|запуг|стыд|вина|психотип|диагноз|без отказа)/i;
const safeContext = /(not approved|not public|requires .*approval|public use requires|no public|blocked|hold|forbidden|запрещ|не утвержд|не является|не использовать|остается|остаётся|требует)/i;
const technicalPercentContext = /(linear-gradient|calc\(|width:|height:|translate|stop offset|viewbox|background-size|x1=|x2=|y1=|y2=)/i;
const safetyLanguageContext = /(без давления|без имитации|без обещан|не созда[её]т впечатление связи|не связь|не имит|не гос|не официальн|no pressure|no manipulation|not official)/i;
const documentPackageContext = /документальн(ый|ого|ому|ым|ом|ая|ой|ую|ою)? пакет/i;

function listFiles(target) {
  const full = path.join(root, target);
  if (!fs.existsSync(full)) return [];
  const stat = fs.statSync(full);
  if (stat.isFile()) return [full];
  return fs.readdirSync(full, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith(".") || entry.name === "node_modules" || entry.name === ".next") return [];
    const child = path.join(target, entry.name);
    return listFiles(child);
  });
}

function isTextFile(file) {
  return /\.(md|ts|tsx|js|jsx|json|css|svg|mjs)$/i.test(file);
}

function isAllowedFailZoneContext(line) {
  if (safeContext.test(line)) return true;
  if (/100%/.test(line) && technicalPercentContext.test(line)) return true;
  if (safetyLanguageContext.test(line)) return true;
  if (documentPackageContext.test(line)) return true;
  return false;
}

let failed = false;
let warnCount = 0;

for (const file of failDirs.flatMap(listFiles).filter(isTextFile)) {
  const rel = path.relative(root, file);
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    if (forbidden.test(line) && !isAllowedFailZoneContext(line)) {
      console.error(`FAIL ${rel}:${index + 1}: ${line.trim()}`);
      failed = true;
    }
  });
}

for (const file of warnDirs.flatMap(listFiles).filter(isTextFile)) {
  const rel = path.relative(root, file);
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    if (forbidden.test(line)) {
      warnCount += 1;
      if (warnCount <= 80) {
        console.log(`WARN ${rel}:${index + 1}: ${line.trim()}`);
      }
    }
  });
}

if (warnCount > 80) {
  console.log(`WARN additional guardrail/boundary matches omitted: ${warnCount - 80}`);
}

if (failed) {
  process.exit(1);
}

console.log(`PASS public-claim scan: no active fail-zone claims; ${warnCount} warning-zone matches`);
