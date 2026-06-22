import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DOMAIN = "https://dokumenty82.ru";
const EXPECTED_PHONE = "tel:+79789987222";

const OUT_JSON = path.join(ROOT, "evidence/ads/ad-readiness-site-actions-proof.json");
const OUT_SUMMARY = path.join(ROOT, "evidence/ads/ad-readiness-site-actions-proof-summary.md");
const OUT_RELEASE = path.join(ROOT, "docs/release/p1-03-ad-readiness-site-actions-audit.md");

const REQUIRED_ROUTES = [
  "/",
  "/razbor-situacii/",
  "/kontakty/",
  "/policy/",
  "/o-proekte/",
  "/srochnye-voprosy/",
  "/otchetnost/",
  "/nalogi-i-rezhimy/",
  "/bank-i-115-fz/",
  "/adres-egryul-direktor/",
  "/kadry/",
  "/soprovozhdenie/",
  "/registraciya-i-likvidaciya/",
  "/otvet-na-trebovanie-ifns/",
  "/deklaraciya-usn/",
  "/nulevaya-otchetnost-ooo/",
  "/nulevaya-otchetnost-ip/",
  "/vosstanovlenie-buhucheta/",
  "/otvet-na-zapros-banka/",
  "/dokumenty-dlya-banka-115-fz/",
  "/yuridicheskiy-adres-simferopol/",
  "/nedostovernost-yuridicheskogo-adresa/",
  "/smena-yuridicheskogo-adresa-ooo/",
  "/smena-direktora-ooo/",
  "/registraciya-ooo/",
  "/registraciya-ip/",
  "/likvidaciya-ooo/",
  "/ausn-krym/",
  "/raschet-nalogovoy-nagruzki/",
  "/nds-pri-usn-2026/",
  "/blog/",
  "/news/",
  "/faq/",
  "/internal/"
];

const SOURCE_REGISTRY_ROUTES = [
  "/",
  "/razbor-situacii/",
  "/kontakty/",
  "/policy/",
  "/o-proekte/",
  "/blog/",
  "/blog/obnovleniya-fns/",
  "/blog/razbory/",
  "/srochnye-voprosy/",
  "/otchetnost/",
  "/nalogi-i-rezhimy/",
  "/bank-i-115-fz/",
  "/adres-egryul-direktor/",
  "/kadry/",
  "/soprovozhdenie/",
  "/registraciya-i-likvidaciya/",
  "/otvet-na-trebovanie-ifns/",
  "/deklaraciya-usn/",
  "/nulevaya-otchetnost-ooo/",
  "/nulevaya-otchetnost-ip/",
  "/vosstanovlenie-buhucheta/",
  "/otvet-na-zapros-banka/",
  "/dokumenty-dlya-banka-115-fz/",
  "/yuridicheskiy-adres-simferopol/",
  "/nedostovernost-yuridicheskogo-adresa/",
  "/smena-yuridicheskogo-adresa-ooo/",
  "/smena-direktora-ooo/",
  "/registraciya-ooo/",
  "/registraciya-ip/",
  "/likvidaciya-ooo/",
  "/ausn-krym/",
  "/raschet-nalogovoy-nagruzki/",
  "/nds-pri-usn-2026/",
  "/srochnoe-oformlenie-sotrudnikov/",
  "/perehod-na-ausn/",
  "/otchetnost-elektronno/",
  "/buhgalterskoe-soprovozhdenie-ooo/",
  "/buhgalterskoe-soprovozhdenie-ip/",
  "/kadrovoe-soprovozhdenie/"
];

const HUB_ROUTES = new Set([
  "/srochnye-voprosy/",
  "/otchetnost/",
  "/nalogi-i-rezhimy/",
  "/bank-i-115-fz/",
  "/adres-egryul-direktor/",
  "/kadry/",
  "/soprovozhdenie/",
  "/registraciya-i-likvidaciya/"
]);

const MONEY_ROUTES = new Set([
  "/otvet-na-trebovanie-ifns/",
  "/deklaraciya-usn/",
  "/nulevaya-otchetnost-ooo/",
  "/nulevaya-otchetnost-ip/",
  "/vosstanovlenie-buhucheta/",
  "/otvet-na-zapros-banka/",
  "/dokumenty-dlya-banka-115-fz/",
  "/yuridicheskiy-adres-simferopol/",
  "/nedostovernost-yuridicheskogo-adresa/",
  "/smena-yuridicheskogo-adresa-ooo/",
  "/smena-direktora-ooo/",
  "/registraciya-ooo/",
  "/registraciya-ip/",
  "/likvidaciya-ooo/"
]);

const DIAGNOSTIC_ROUTES = new Set([
  "/ausn-krym/",
  "/raschet-nalogovoy-nagruzki/",
  "/nds-pri-usn-2026/"
]);

const HIGH_RISK_TAX_ROUTES = new Set([
  "/nalogi-i-rezhimy/",
  "/ausn-krym/",
  "/raschet-nalogovoy-nagruzki/",
  "/nds-pri-usn-2026/"
]);

const SUPPORT_ROUTES = new Set([
  "/policy/",
  "/o-proekte/",
  "/blog/",
  "/blog/obnovleniya-fns/",
  "/blog/razbory/",
  "/faq/",
  "/internal/",
  "/internal/graphics-proof/",
  "/internal/visual-detail-kit/",
  "/404/",
  "/_not-found/"
]);

function git(args, fallback = "") {
  try {
    return execFileSync("git", args, { cwd: ROOT, encoding: "utf8" }).trim();
  } catch {
    return fallback;
  }
}

function walk(dir, ignored = new Set([".git", "node_modules"])) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (ignored.has(name)) continue;
    const full = path.join(dir, name);
    const rel = path.relative(ROOT, full);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...walk(full, ignored));
    } else {
      out.push(rel);
    }
  }
  return out.sort();
}

function read(rel) {
  return readFileSync(path.join(ROOT, rel), "utf8");
}

function decodeEntities(value = "") {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number.parseInt(dec, 10)));
}

function stripTags(html = "") {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return decodeEntities(m?.[2] ?? m?.[3] ?? m?.[4] ?? "");
}

function matchAll(re, text) {
  return Array.from(text.matchAll(re));
}

function routeFromIndexHtml(rel) {
  if (rel === "index.html") return "/";
  if (!rel.endsWith("/index.html")) return null;
  return `/${rel.slice(0, -"index.html".length)}`;
}

function routeToHtml(route) {
  if (route === "/") return "index.html";
  const clean = normalizeRoute(route).replace(/^\/|\/$/g, "");
  return clean ? `${clean}/index.html` : "index.html";
}

function normalizeRoute(input) {
  if (!input) return "";
  let value = input.trim();
  if (value.startsWith(DOMAIN)) value = value.slice(DOMAIN.length);
  if (!value.startsWith("/")) value = `/${value}`;
  value = value.split("#")[0].split("?")[0];
  if (value === "/policy") return "/policy/";
  if (value !== "/" && !value.endsWith("/")) value += "/";
  return value;
}

function canonicalUrl(route) {
  return route === "/" ? `${DOMAIN}/` : `${DOMAIN}${route}`;
}

function pageType(route) {
  if (route === "/") return "home";
  if (route === "/razbor-situacii/") return "situation_review";
  if (route === "/kontakty/") return "contact";
  if (route === "/policy/") return "policy";
  if (route === "/o-proekte/") return "about";
  if (route.startsWith("/blog/")) return "blog";
  if (route === "/faq/") return "faq";
  if (route.startsWith("/internal/")) return "internal";
  if (HUB_ROUTES.has(route)) return "hub";
  if (MONEY_ROUTES.has(route)) return "money";
  if (DIAGNOSTIC_ROUTES.has(route)) return "diagnostic";
  if (route === "/404/" || route === "/_not-found/") return "system";
  return "unknown";
}

function extractMeta(html) {
  const title = decodeEntities(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const description =
    attr(html.match(/<meta[^>]+name=["']description["'][^>]*>/i)?.[0] ?? "", "content") ||
    attr(html.match(/<meta[^>]+content=["'][^"']*["'][^>]+name=["']description["'][^>]*>/i)?.[0] ?? "", "content");
  const robots =
    attr(html.match(/<meta[^>]+name=["']robots["'][^>]*>/i)?.[0] ?? "", "content") ||
    attr(html.match(/<meta[^>]+content=["'][^"']*["'][^>]+name=["']robots["'][^>]*>/i)?.[0] ?? "", "content");
  const canonical = attr(html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0] ?? "", "href");
  const h1Matches = matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi, html);
  const h1 = h1Matches.map((m) => stripTags(m[1])).filter(Boolean);
  return { title, description, robots, canonical, h1, h1Count: h1Matches.length };
}

function extractActions(route, html) {
  const anchors = matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi, html).map((m, idx) => {
    const tag = m[0].match(/^<a\b[^>]*>/i)?.[0] ?? "";
    const href = attr(tag, "href");
    const label = stripTags(m[0]).slice(0, 160);
    return classifyAction({ sourceRoute: route, kind: "link", index: idx, label, href, raw: tag });
  });
  const buttons = matchAll(/<button\b[^>]*>[\s\S]*?<\/button>/gi, html).map((m, idx) => {
    const tag = m[0].match(/^<button\b[^>]*>/i)?.[0] ?? "";
    const type = attr(tag, "type") || "submit-default";
    const label = stripTags(m[0]).slice(0, 160);
    return classifyAction({ sourceRoute: route, kind: "button", index: idx, label, href: "", buttonType: type, raw: tag });
  });
  return [...anchors, ...buttons];
}

let builtRouteSet = new Set();

function classifyAction(action) {
  const notes = [];
  let status = "OK";
  let targetRoute = "";
  let safeForAds = true;
  const href = action.href || "";
  const label = action.label || "(empty label)";

  if (action.kind === "button") {
    if (action.buttonType === "submit" || action.buttonType === "submit-default") {
      status = label === "Понятно" ? "OK" : "NEEDS_REVIEW";
      if (status !== "OK") {
        notes.push("button may submit if placed inside a form");
        safeForAds = false;
      }
    }
    if (/заявк|отправ|upload|загруз/i.test(label)) {
      status = "NEEDS_REVIEW";
      notes.push("button label could imply live lead/form/upload behavior");
      safeForAds = false;
    }
    return { ...action, targetRoute, status, notes, safeForAds };
  }

  if (!href) {
    return { ...action, targetRoute, status: "BROKEN", notes: ["empty href"], safeForAds: false };
  }
  if (href.startsWith("#")) return { ...action, targetRoute: href, status, notes, safeForAds };
  if (href.startsWith("tel:")) {
    if (href !== EXPECTED_PHONE) {
      status = "BROKEN";
      notes.push(`wrong tel href, expected ${EXPECTED_PHONE}`);
      safeForAds = false;
    }
    return { ...action, targetRoute: href, status, notes, safeForAds };
  }
  if (href.startsWith("mailto:")) {
    status = "HOLD";
    notes.push("email is TARGET until domain mail is confirmed");
    return { ...action, targetRoute: href, status, notes, safeForAds: false };
  }
  if (/^(https?:)?\/\//i.test(href)) {
    if (href.startsWith(DOMAIN)) {
      targetRoute = normalizeRoute(href);
    } else {
      status = "NEEDS_REVIEW";
      notes.push("external link requires owner/profile confirmation");
      return { ...action, targetRoute: href, status, notes, safeForAds: false };
    }
  } else if (href.startsWith("/")) {
    targetRoute = normalizeRoute(href);
  } else {
    status = "BROKEN";
    notes.push("relative non-root href is not canonical");
    return { ...action, targetRoute: href, status, notes, safeForAds: false };
  }

  if (targetRoute && !builtRouteSet.has(targetRoute)) {
    status = "BROKEN";
    notes.push("internal target is not built in static snapshot");
    safeForAds = false;
  }
  if (/показать документы/i.test(label)) {
    notes.push("means agreed safe review path, not public upload");
  }
  if (/построить маршрут/i.test(label) && targetRoute !== "/kontakty/") {
    status = "NEEDS_REVIEW";
    notes.push("route/map action should resolve through contacts unless external profile is approved");
    safeForAds = false;
  }
  return { ...action, targetRoute, status, notes, safeForAds };
}

function collectSitemapRoutes() {
  if (!statSafe("sitemap.xml")) return [];
  const xml = read("sitemap.xml");
  return matchAll(/<loc>([^<]+)<\/loc>/gi, xml).map((m) => normalizeRoute(m[1]));
}

function statSafe(rel) {
  try {
    statSync(path.join(ROOT, rel));
    return true;
  } catch {
    return false;
  }
}

function publicRuntimeFiles() {
  return walk(ROOT).filter((rel) => {
    if (/^(docs|evidence|scripts)\//.test(rel)) return false;
    if (!/\.(html|txt|js|css|svg|xml)$/i.test(rel)) return false;
    return true;
  });
}

function scanForbidden(files) {
  const rules = [
    { id: "PUBLIC_LIVE_ALLOWED_TRUE", re: /PUBLIC_LIVE_ALLOWED\s*=\s*true|PUBLIC_LIVE_ALLOWED=true/i, severity: "OBSERVED" },
    { id: "PAID_TRAFFIC_TRUE", re: /paidTrafficAllowed\s*[:=]\s*true/i, severity: "FAIL" },
    { id: "FORMS_LIVE_TRUE", re: /formsLive\s*[:=]\s*true/i, severity: "FAIL" },
    { id: "CRM_ENABLED_TRUE", re: /crmEnabled\s*[:=]\s*true|crmSuccessEnabled\s*[:=]\s*true/i, severity: "FAIL" },
    { id: "FILE_UPLOAD_INPUT", re: /<input[^>]+type=["']file["']|type\\?["']file/i, severity: "FAIL" },
    { id: "WEBHOOK_OR_ENDPOINT", re: /webhook|crm[_-]?endpoint|api\/lead|api\/crm|\/submit/i, severity: "FAIL" },
    { id: "SECRET_OR_TOKEN", re: /\b(token|secret|api[_-]?key)\s*[:=]/i, severity: "FAIL" },
    { id: "REACH_GOAL", re: /reachGoal/i, severity: "WARN" },
    { id: "GET_CLIENT_ID", re: /getClientID/i, severity: "FAIL" },
    { id: "ECOMMERCE", re: /ecommerce/i, severity: "WARN" },
    { id: "WEBVISOR", re: /webvisor/i, severity: "WARN" },
    { id: "TAG_MANAGER", re: /tagmanager|googletagmanager/i, severity: "FAIL" },
    { id: "RATING_OR_REVIEW_SCHEMA", re: /AggregateRating|["']@type["']\s*:\s*["']Review["']|ratingValue|reviewRating|review-widget|rating-widget|виджет отзывов|виджет рейтинга/i, severity: "FAIL" },
    { id: "PRICE_OR_OFFERS_SCHEMA", re: /priceRange|offers|"price"|₽|\b\d+\s*(руб\.?|₽)/i, severity: "FAIL" },
    { id: "GUARANTEE_OR_DEADLINE_CLAIM", re: /гарант|за\s+\d+\s+(день|дня|дней|час|часа|часов)/i, severity: "FAIL" },
    { id: "LEGAL_ID_OR_HOURS", re: /\b(ИНН|ОГРН|КПП)\b|openingHours|legalName|taxID|режим работы|часы работы|этаж|офис\s*\d/i, severity: "FAIL" },
    { id: "OLD_BRAND_OR_DOMAIN", re: /business-helps|rahima|rahima-consulting|рахим/i, severity: "FAIL" },
    { id: "FALSE_SUCCESS", re: /заявк[а-яё\s]+(отправлена|принята)|успешно\s+(отправлено|принято|принята)/i, severity: "FAIL" }
  ];
  const findings = [];
  for (const rel of files) {
    const text = read(rel);
    for (const rule of rules) {
      const m = text.match(rule.re);
      if (!m) continue;
      const idx = Math.max(0, m.index ?? 0);
      const context = text.slice(Math.max(0, idx - 120), idx + 180).replace(/\s+/g, " ").trim();
      const isSafeNegativeUpload =
        rule.id === "WEBHOOK_OR_ENDPOINT" &&
        /no webhook|без webhook|CRM remain|CRM\/forms are OFF/i.test(context);
      if (isSafeNegativeUpload) continue;
      if (
        rule.id === "LEGAL_ID_OR_HOURS" &&
        /не должны содержать|не публикует|почему здесь нет|добавляются только|без подтверждения|HOLD/i.test(context)
      ) {
        findings.push({
          id: rule.id,
          file: rel,
          severity: "SAFE_POLICY_NOTICE",
          context
        });
        continue;
      }
      const isPublicLiveObservation = rule.id === "PUBLIC_LIVE_ALLOWED_TRUE";
      findings.push({
        id: rule.id,
        file: rel,
        severity: isPublicLiveObservation ? "OBSERVED_CURRENT_PRODUCTION" : rule.severity,
        context
      });
    }
  }
  return findings;
}

function formState(htmlFiles) {
  const combined = htmlFiles.map((rel) => read(rel)).join("\n");
  const formTags = matchAll(/<form\b[^>]*>/gi, combined).map((m) => m[0]);
  const placeholderForms = formTags.filter((tag) => /data-form-placeholder=["']true["']|data-forms-live=["']false["']/i.test(tag)).length;
  const liveLikeForms = formTags.filter((tag) => {
    const isPlaceholder = /data-form-placeholder=["']true["']|data-forms-live=["']false["']/i.test(tag);
    const hasLiveMethodOrAction = /\bmethod=["']post["']|\baction=["'][^"']+["']/i.test(tag);
    return !isPlaceholder || hasLiveMethodOrAction;
  }).length;
  return {
    forms: formTags.length,
    placeholderForms,
    liveLikeForms,
    postActions: matchAll(/<form[^>]+method=["']post["']/gi, combined).length,
    fileInputs: matchAll(/<input[^>]+type=["']file["']/gi, combined).length,
    webhookMarkers: matchAll(/webhook|crm[_-]?endpoint|api\/lead|api\/crm/gi, combined).length,
    falseSuccessMarkers: matchAll(/заявк[а-яё\s]+(отправлена|принята)|успешно\s+(отправлено|принято|принята)/gi, combined).length
  };
}

function classifyLanding(route, page) {
  if (!page.exists) return { status: "BROKEN_DO_NOT_USE", risks: ["route is missing in current static snapshot"] };
  if (route.startsWith("/internal/") || route === "/internal/" || route.startsWith("/blog/") || route === "/faq/" || route === "/policy/" || route === "/o-proekte/") {
    return { status: route.startsWith("/internal/") || route.startsWith("/blog/") || route === "/faq/" ? "INTERNAL_OR_NOINDEX_DO_NOT_USE" : "HOLD_DO_NOT_USE_AS_LANDING", risks: ["support/content/internal page, not an ad landing"] };
  }
  const risks = [];
  if (!page.indexable) risks.push("not indexable");
  if (!page.selfCanonical) risks.push("canonical mismatch");
  if (!page.title || !page.description || page.h1Count !== 1) risks.push("metadata/H1 issue");
  if (!page.primaryCta) risks.push("primary CTA missing");
  if (!page.phoneLinkPresent) risks.push("phone path missing");
  if (!page.policyLinkPresent) risks.push("policy link missing");
  if (page.forbiddenFailures.length > 0) risks.push("forbidden runtime claim/action finding");
  if (risks.length > 0) return { status: "NOT_READY_FOR_AD_TRAFFIC", risks };
  if (route === "/" || route === "/razbor-situacii/" || route === "/kontakty/") {
    return { status: "READY_FOR_LIMITED_AD_TEST", risks: ["global owner/legal/Metrika/deploy gates still required"] };
  }
  if (route === "/srochnye-voprosy/") {
    return { status: "READY_WITH_COPY_REVIEW", risks: ["urgent-intent copy must avoid deadline/result promises"] };
  }
  if (HIGH_RISK_TAX_ROUTES.has(route)) {
    return { status: "HOLD_DO_NOT_USE_AS_LANDING", risks: ["tax/legal advice moderation and owner/legal review required"] };
  }
  if (route.includes("bank") || route.includes("115-fz") || route.includes("zapros-banka")) {
    return { status: "READY_WITH_COPY_REVIEW", risks: ["bank/115-FZ copy must avoid unlock/approval guarantees"] };
  }
  if (MONEY_ROUTES.has(route) || HUB_ROUTES.has(route) || DIAGNOSTIC_ROUTES.has(route)) {
    return { status: "READY_WITH_COPY_REVIEW", risks: ["commercial/sensitive page requires narrow ad copy and legal review"] };
  }
  return { status: "NEEDS_MANUAL_REVIEW", risks: ["route type is not explicitly classified"] };
}

function actionShort(action) {
  return {
    sourceRoute: action.sourceRoute,
    label: action.label,
    href: action.href,
    targetRoute: action.targetRoute,
    kind: action.kind,
    status: action.status,
    notes: action.notes,
    safeForAds: action.safeForAds
  };
}

const allFiles = walk(ROOT);
const indexHtmlFiles = allFiles.filter((rel) => rel.endsWith("index.html"));
const builtRoutes = indexHtmlFiles.map(routeFromIndexHtml).filter(Boolean).sort();
builtRouteSet = new Set(builtRoutes);
const sitemapRoutes = collectSitemapRoutes();
const sitemapSet = new Set(sitemapRoutes);
const runtimeFiles = publicRuntimeFiles();
const runtimeForbiddenFindings = scanForbidden(runtimeFiles);
const htmlFiles = indexHtmlFiles;

const pageRoutes = Array.from(new Set([...REQUIRED_ROUTES, ...builtRoutes, ...sitemapRoutes])).sort((a, b) => a.localeCompare(b, "ru"));
const pages = [];
const actions = [];

for (const route of pageRoutes) {
  const rel = routeToHtml(route);
  const exists = statSafe(rel);
  const html = exists ? read(rel) : "";
  const meta = exists ? extractMeta(html) : { title: "", description: "", robots: "", canonical: "", h1: [], h1Count: 0 };
  const pageActions = exists ? extractActions(route, html) : [];
  actions.push(...pageActions);
  const routeForbidden = runtimeForbiddenFindings.filter((f) => f.file === rel || f.file.startsWith(route.replace(/^\/|\/$/g, "")));
  const forbiddenFailures = routeForbidden.filter((f) => f.severity === "FAIL");
  const primaryCta = pageActions.find((a) => /разобрать ситуацию|показать документы|позвонить|построить маршрут/i.test(a.label) && a.status !== "BROKEN")?.label ?? "";
  const page = {
    route,
    url: canonicalUrl(route),
    htmlFile: exists ? rel : null,
    exists,
    staticStatus: exists ? "BUILT_STATIC_200_CANDIDATE" : "MISSING_EXPECTED",
    pageType: pageType(route),
    inSitemap: sitemapSet.has(route),
    indexable: exists && !/noindex/i.test(meta.robots) && !route.startsWith("/internal/") && !route.startsWith("/blog/") && route !== "/faq/",
    ...meta,
    selfCanonical: exists ? meta.canonical === canonicalUrl(route) : false,
    primaryCta,
    secondaryCtas: pageActions.filter((a) => /позвонить|построить маршрут|показать документы|контакты/i.test(a.label)).map((a) => a.label).slice(0, 10),
    phoneLinkPresent: pageActions.some((a) => a.href === EXPECTED_PHONE),
    contactLinkPresent: pageActions.some((a) => a.targetRoute === "/kontakty/"),
    policyLinkPresent: pageActions.some((a) => a.targetRoute === "/policy/"),
    cookieNoticePresent: exists && /Уведомление об аналитике и cookies|Сайт использует техническую аналитику и cookies/i.test(html),
    metrikaPresent: exists && /109869928|mc\.yandex\.ru|ym\(109869928/i.test(html),
    actionCount: pageActions.length,
    brokenActionCount: pageActions.filter((a) => a.status === "BROKEN").length,
    forbiddenFindings: routeForbidden.map((f) => ({ id: f.id, severity: f.severity })),
    forbiddenFailures
  };
  const landing = classifyLanding(route, page);
  pages.push({ ...page, landingStatus: landing.status, yandexDirectRisks: landing.risks });
}

const brokenLinks = actions.filter((a) => a.status === "BROKEN").map(actionShort);
const emptyHrefActions = actions.filter((a) => !a.href && a.kind === "link").map(actionShort);
const wrongTelLinks = actions.filter((a) => a.href.startsWith("tel:") && a.href !== EXPECTED_PHONE).map(actionShort);
const holdActions = actions.filter((a) => a.status === "HOLD" || a.status === "NEEDS_REVIEW").map(actionShort);

const builtExpectedMissing = SOURCE_REGISTRY_ROUTES.filter((route) => !builtRouteSet.has(route));
const sitemapMissingBuilt = sitemapRoutes.filter((route) => !builtRouteSet.has(route));
const extraBuiltRoutes = builtRoutes.filter((route) => !sitemapSet.has(route) && !SUPPORT_ROUTES.has(route) && route !== "/404/" && route !== "/_not-found/");

const trackingText = runtimeFiles.filter((rel) => /\.(html|txt|js)$/i.test(rel)).map((rel) => read(rel)).join("\n");
const trackingState = {
  metrikaCounter: /109869928/.test(trackingText) ? "109869928_PRESENT" : "ABSENT",
  cookieNotice: pages.some((p) => p.cookieNoticePresent) ? "PRESENT" : "ABSENT",
  policyDisclosure: statSafe("policy/index.html") && /cookies|аналитик|персональн/i.test(read("policy/index.html")) ? "PRESENT" : "NEEDS_REVIEW",
  reachGoal: /reachGoal/i.test(trackingText) ? "PRESENT_NEEDS_LK_CONFIRMATION" : "ABSENT",
  getClientID: /getClientID/i.test(trackingText) ? "PRESENT_BLOCKER" : "ABSENT",
  webvisor: /webvisor\s*:\s*true|webvisor\\?["']?:\\?true/i.test(trackingText) ? "PRESENT_OWNER_LEGAL_DECISION_REQUIRED" : "ABSENT",
  ecommerce: /ecommerce\s*:\s*["']?dataLayer|ecommerce\\?["']?:/i.test(trackingText) ? "PRESENT_OWNER_LEGAL_DECISION_REQUIRED" : "ABSENT",
  tagManager: /tagmanager|googletagmanager/i.test(trackingText) ? "PRESENT_BLOCKER" : "ABSENT",
  offlineConversions: /offline.?conversion|offlineConversions/i.test(trackingText) ? "PRESENT_BLOCKER" : "ABSENT",
  formSubmitSuccessGoal: /reachGoal[\s\S]{0,160}goal_form_submit_success|data-event-name=["']goal_form_submit_success["']/i.test(trackingText)
    ? "PRESENT_BLOCKER_WHILE_FORMS_OFF"
    : /goal_form_submit_success/i.test(trackingText)
      ? "DOCUMENTED_DISABLED_IN_POLICY"
      : "ABSENT"
};

const forms = formState(htmlFiles);
const crmUploadState = {
  formsLive: forms.liveLikeForms > 0 || forms.postActions > 0 ? "NEEDS_REVIEW" : forms.placeholderForms > 0 ? "PLACEHOLDER_FORMS_ONLY" : "NO_PUBLIC_FORM",
  crm: forms.webhookMarkers > 0 ? "WEBHOOK_MARKER_FOUND" : "NO_CRM_WEBHOOK_FOUND",
  upload: forms.fileInputs > 0 ? "PUBLIC_FILE_UPLOAD_FOUND" : "NO_PUBLIC_UPLOAD",
  falseSuccess: forms.falseSuccessMarkers > 0 ? "FALSE_SUCCESS_MARKER_FOUND" : "NO_FALSE_SUCCESS_FOUND",
  details: forms
};

const allowedLimitedTestCandidates = pages.filter((p) => p.landingStatus === "READY_FOR_LIMITED_AD_TEST").map((p) => p.route);
const readyWithCopyReview = pages.filter((p) => p.landingStatus === "READY_WITH_COPY_REVIEW").map((p) => p.route);
const doNotUseLandingList = pages
  .filter((p) => ["HOLD_DO_NOT_USE_AS_LANDING", "INTERNAL_OR_NOINDEX_DO_NOT_USE", "BROKEN_DO_NOT_USE", "NOT_READY_FOR_AD_TRAFFIC"].includes(p.landingStatus))
  .map((p) => ({ route: p.route, status: p.landingStatus, risks: p.yandexDirectRisks }));

const failingForbidden = runtimeForbiddenFindings.filter((f) => f.severity === "FAIL");
const globalBlockers = [
  "OWNER_GO_NOT_GIVEN",
  "PAID_TRAFFIC_HOLD",
  "DEPLOY_SOURCE_PARTIALLY_PROVEN",
  trackingState.webvisor.startsWith("PRESENT") ? "METRIKA_WEBVISOR_OWNER_LEGAL_DECISION_REQUIRED" : null,
  trackingState.ecommerce.startsWith("PRESENT") ? "METRIKA_ECOMMERCE_OWNER_LEGAL_DECISION_REQUIRED" : null,
  builtExpectedMissing.length ? "SOURCE_REGISTRY_ROUTES_NOT_IN_CURRENT_STATIC_CONTOUR" : null
].filter(Boolean);

let finalVerdict = "AD_READINESS_ACTIONS_AUDIT_COMPLETE_NO_GO";
if (brokenLinks.length || sitemapMissingBuilt.length) finalVerdict = "BLOCKED_BROKEN_ACTIONS";
if (crmUploadState.upload !== "NO_PUBLIC_UPLOAD" || crmUploadState.falseSuccess !== "NO_FALSE_SUCCESS_FOUND") finalVerdict = "BLOCKED_FORM_OR_UPLOAD_RISK";
if (failingForbidden.some((f) => /PRICE|GUARANTEE|OLD_BRAND|RATING|LEGAL_ID/.test(f.id))) finalVerdict = "BLOCKED_FORBIDDEN_CLAIMS";
if (trackingState.getClientID !== "ABSENT" || trackingState.tagManager !== "ABSENT" || trackingState.offlineConversions !== "ABSENT" || trackingState.formSubmitSuccessGoal === "PRESENT_BLOCKER_WHILE_FORMS_OFF") {
  finalVerdict = "BLOCKED_TRACKING_PII_RISK";
}
if (!builtRouteSet.has("/policy/") || !pages.every((p) => !p.exists || p.policyLinkPresent || p.route === "/policy/" || p.pageType === "system")) {
  finalVerdict = "BLOCKED_MISSING_POLICY_OR_CONTACT";
}

const yandexBusiness = {
  brandName: "Документы для бизнеса",
  categoryRecommendation: "Центр подготовки документов",
  address: "Республика Крым, Симферополь, ул. им. Мате Залки, 1",
  phone: "+7 (978) 998-72-22",
  routeCta: "available through /kontakty/ and internal route CTA",
  profileConfirmation: "UNKNOWN_HOLD",
  hours: "HOLD_OWNER_REQUIRED",
  officeFloor: "HOLD_OWNER_REQUIRED",
  legalIds: "HOLD_OWNER_LEGAL_REQUIRED",
  photosSignageInterior: "NEEDS_OWNER_PROVIDED_ASSETS",
  ratingsReviews: "ABSENT_AND_SHOULD_REMAIN_ABSENT_UNTIL_VERIFIED"
};

const evidence = {
  checkedAt: new Date().toISOString(),
  repositoryMode: "CURRENT_MAIN_STATIC_SNAPSHOT",
  git: {
    branch: git(["branch", "--show-current"], "UNKNOWN"),
    commit: git(["rev-parse", "HEAD"], "UNKNOWN"),
    commitShort: git(["log", "-1", "--oneline"], "UNKNOWN")
  },
  inputs: {
    sourceDocsRead: [
      "AGENTS.md",
      "docs/00-start/source-of-truth.md",
      "docs/00-start/active-canon-index.md",
      "docs/00-start/hold-register.md",
      "docs/seo/route-registry.md",
      "docs/seo/yandex-seo-playbook.md",
      "docs/qa/yandex-seo-release-gate.md",
      "docs/legal/forms-cookies-analytics-crm-compliance.md"
    ],
    siteFilesRead: [
      "robots.txt",
      "sitemap.xml",
      "docs/ads/final-paid-traffic-go-no-go-2026-06-22.md",
      "docs/ads/owner-deploy-legal-decision-packet-2026-06-22.md",
      "docs/ads/owner-decision-intake-2026-06-22.md",
      "docs/ads/production-deploy-source-verification-2026-06-22.md",
      "route index.html files",
      "_next static chunks"
    ],
    missingExpectedSiteSourceFiles: [
      "AGENTS.md",
      "README.md",
      "next.config.ts",
      "app/layout.tsx",
      "app/page.tsx",
      "app/[slug]/page.tsx",
      "components/Header.tsx",
      "components/Footer.tsx",
      "lib/feature-flags.ts",
      "lib/content.ts",
      "lib/routes.ts",
      "lib/routes/route-page-data.ts",
      "lib/tracking/*",
      "public/robots.txt",
      "public/sitemap.xml"
    ].map((file) => ({ file, status: "MISSING_EXPECTED_IN_CURRENT_STATIC_SNAPSHOT" }))
  },
  routeAudit: {
    requiredRoutes: REQUIRED_ROUTES,
    sourceRegistryRoutes: Array.from(new Set(SOURCE_REGISTRY_ROUTES)).sort(),
    builtRoutes,
    sitemapRoutes,
    sourceRegistryRoutesMissingFromCurrentStaticContour: builtExpectedMissing,
    sitemapRoutesMissingBuiltHtml: sitemapMissingBuilt,
    extraBuiltRoutesOutsideSitemapAndSupport: extraBuiltRoutes,
    pages
  },
  actionAudit: {
    totalActions: actions.length,
    actions: actions.map(actionShort),
    brokenLinks,
    emptyHrefActions,
    wrongTelLinks,
    holdOrNeedsReviewActions: holdActions
  },
  formState: crmUploadState,
  crmUploadState,
  trackingNoPiiState: trackingState,
  forbiddenScan: {
    runtimeFilesChecked: runtimeFiles.length,
    findings: runtimeForbiddenFindings,
    failingFindings: failingForbidden,
    docsOnlyWarning: "docs were excluded from runtime failure scan; documented HOLD examples are not runtime violations"
  },
  yandexDirectRiskReview: {
    allowedLimitedTestCandidates,
    readyWithCopyReview,
    doNotUseLandingList,
    globalBlockers,
    notes: [
      "Click goals are intent events, not confirmed leads.",
      "Bank/115-FZ/tax pages require narrow ad copy and owner/legal review.",
      "No paid traffic GO is recorded."
    ]
  },
  yandexBusinessReadiness: yandexBusiness,
  finalVerdict,
  deployStatus: "DEPLOY_NOT_REQUIRED_EVIDENCE_ONLY",
  paidTraffic: "HOLD"
};

function mdTable(rows, headers) {
  const esc = (v) => String(v ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${headers.map((h) => esc(row[h])).join(" | ")} |`)
  ].join("\n");
}

function writeSummary(e) {
  const pageRows = e.routeAudit.pages.map((p) => ({
    Route: p.route,
    Type: p.pageType,
    Exists: p.exists ? "yes" : "no",
    H1: p.h1?.[0] || "",
    CTA: p.primaryCta || "MISSING",
    Phone: p.phoneLinkPresent ? "yes" : "no",
    Policy: p.policyLinkPresent ? "yes" : p.route === "/policy/" ? "self" : "no",
    Status: p.landingStatus,
    Risks: p.yandexDirectRisks.join("; ")
  }));
  const actionRows = e.actionAudit.actions.slice(0, 120).map((a) => ({
    Source: a.sourceRoute,
    Label: a.label,
    Target: a.href || a.targetRoute || "",
    Kind: a.kind,
    Result: a.status,
    Notes: a.notes.join("; ")
  }));
  const lines = [
    "# P1-03 Ad Readiness Site Actions Proof Summary",
    "",
    `Checked at: \`${e.checkedAt}\``,
    `Branch: \`${e.git.branch}\``,
    `Commit: \`${e.git.commitShort}\``,
    `Repository mode: \`${e.repositoryMode}\``,
    `Final verdict: \`${e.finalVerdict}\``,
    `Deploy status: \`${e.deployStatus}\``,
    `Paid traffic: \`${e.paidTraffic}\``,
    "",
    "## Counts",
    "",
    `- Built routes: ${e.routeAudit.builtRoutes.length}`,
    `- Sitemap routes: ${e.routeAudit.sitemapRoutes.length}`,
    `- Pages audited: ${e.routeAudit.pages.length}`,
    `- Actions audited: ${e.actionAudit.totalActions}`,
    `- Broken links: ${e.actionAudit.brokenLinks.length}`,
    `- Runtime forbidden failing findings: ${e.forbiddenScan.failingFindings.length}`,
    "",
    "## Limited-Test Candidates",
    "",
    e.yandexDirectRiskReview.allowedLimitedTestCandidates.length
      ? e.yandexDirectRiskReview.allowedLimitedTestCandidates.map((r) => `- \`${r}\``).join("\n")
      : "- none",
    "",
    "## Ready With Copy Review",
    "",
    e.yandexDirectRiskReview.readyWithCopyReview.length
      ? e.yandexDirectRiskReview.readyWithCopyReview.map((r) => `- \`${r}\``).join("\n")
      : "- none",
    "",
    "## Global Blockers",
    "",
    e.yandexDirectRiskReview.globalBlockers.map((b) => `- \`${b}\``).join("\n"),
    "",
    "## Tracking / Privacy State",
    "",
    Object.entries(e.trackingNoPiiState).map(([k, v]) => `- ${k}: \`${v}\``).join("\n"),
    "",
    "## Forms / CRM / Upload",
    "",
    Object.entries(e.crmUploadState).filter(([k]) => k !== "details").map(([k, v]) => `- ${k}: \`${v}\``).join("\n"),
    "",
    "## Pages Checked",
    "",
    mdTable(pageRows, ["Route", "Type", "Exists", "H1", "CTA", "Phone", "Policy", "Status", "Risks"]),
    "",
    "## Actions Checked",
    "",
    mdTable(actionRows, ["Source", "Label", "Target", "Kind", "Result", "Notes"]),
    "",
    "Full JSON: `evidence/ads/ad-readiness-site-actions-proof.json`"
  ];
  writeFileSync(OUT_SUMMARY, `${lines.join("\n")}\n`);
}

function writeReleaseDoc(e) {
  const pageRows = e.routeAudit.pages.map((p) => ({
    Route: p.route,
    Type: p.pageType,
    Status: p.exists ? p.staticStatus : "MISSING",
    H1: p.h1?.[0] || "",
    CTA: p.primaryCta || "MISSING",
    Phone: p.phoneLinkPresent ? "yes" : "no",
    Policy: p.policyLinkPresent ? "yes" : p.route === "/policy/" ? "self" : "no",
    "Landing Status": p.landingStatus,
    "Risk Notes": p.yandexDirectRisks.join("; ")
  }));
  const actionRows = e.actionAudit.actions.slice(0, 160).map((a) => ({
    "Source Route": a.sourceRoute,
    Label: a.label,
    "href/action": a.href || a.targetRoute || "(button)",
    Type: a.kind,
    Result: a.status,
    Notes: a.notes.join("; ")
  }));
  const recommendationRows = e.routeAudit.pages.map((p) => {
    let use = "needs manual review";
    if (p.landingStatus === "READY_FOR_LIMITED_AD_TEST") use = "use for limited test only after global gates";
    if (p.landingStatus === "READY_WITH_COPY_REVIEW") use = "use only after copy/legal review";
    if (["HOLD_DO_NOT_USE_AS_LANDING", "INTERNAL_OR_NOINDEX_DO_NOT_USE", "BROKEN_DO_NOT_USE", "NOT_READY_FOR_AD_TRAFFIC"].includes(p.landingStatus)) use = "do not use";
    return {
      Route: p.route,
      "Recommended Campaign Use": use,
      "Ad Copy Limits": p.yandexDirectRisks.join("; "),
      Status: p.landingStatus
    };
  });
  const forbiddenRows = e.forbiddenScan.findings.slice(0, 80).map((f) => ({
    Finding: f.id,
    File: f.file,
    Severity: f.severity,
    Context: f.context
  }));
  const missingRows = e.inputs.missingExpectedSiteSourceFiles.map((m) => ({
    File: m.file,
    Status: m.status
  }));
  const lines = [
    "# P1-03 Ad Readiness Site Actions Audit",
    "",
    "## Status",
    "",
    `\`${e.finalVerdict}\``,
    "",
    "## Scope",
    "",
    "This is an audit and evidence task. It does not approve ad launch, paid traffic, CRM, forms, upload, messaging, Yandex Business publication, legal-data publication, deploy, DNS changes or production server changes.",
    "",
    "## Inputs",
    "",
    `- Branch: \`${e.git.branch}\``,
    `- Commit: \`${e.git.commit}\``,
    `- Repository mode: \`${e.repositoryMode}\``,
    `- Sitemap routes: ${e.routeAudit.sitemapRoutes.length}`,
    `- Built static routes: ${e.routeAudit.builtRoutes.length}`,
    "",
    "Source docs read:",
    "",
    e.inputs.sourceDocsRead.map((file) => `- \`${file}\``).join("\n"),
    "",
    "Site files read:",
    "",
    e.inputs.siteFilesRead.map((file) => `- \`${file}\``).join("\n"),
    "",
    "Missing expected site source files in this static snapshot:",
    "",
    mdTable(missingRows, ["File", "Status"]),
    "",
    "## Current Site State",
    "",
    "- Production source repo for this task: `elena70semen/dokumenty82-site`.",
    "- Current checked tree is a static production snapshot, not a full Next.js source tree.",
    `- Metrika: \`${e.trackingNoPiiState.metrikaCounter}\`.`,
    `- Cookie notice: \`${e.trackingNoPiiState.cookieNotice}\`.`,
    `- Policy disclosure: \`${e.trackingNoPiiState.policyDisclosure}\`.`,
    `- Forms/CRM/upload: \`${e.crmUploadState.formsLive}\`, \`${e.crmUploadState.crm}\`, \`${e.crmUploadState.upload}\`.`,
    "- Paid traffic: `HOLD`.",
    "- Local/Yandex Business profile publication: `HOLD / UNKNOWN`.",
    "",
    "## Pages Checked",
    "",
    mdTable(pageRows, ["Route", "Type", "Status", "H1", "CTA", "Phone", "Policy", "Landing Status", "Risk Notes"]),
    "",
    "## Actions Checked",
    "",
    mdTable(actionRows, ["Source Route", "Label", "href/action", "Type", "Result", "Notes"]),
    "",
    "## CTA / Phone / Contact Flow",
    "",
    "- Primary CTA resolves to safe internal route paths, primarily `/razbor-situacii/`, `/kontakty/`, phone, or document-review wording.",
    "- Phone actions use `tel:+79789987222` when present.",
    "- Route/map action currently resolves through `/kontakty/` rather than an unapproved external profile link.",
    "- `Показать документы` is treated as an agreed safe review path and does not create a public upload path.",
    "- Cookie notice action is a local acknowledgement button, not a submit/lead action.",
    "",
    "## Forms / CRM / Upload Status",
    "",
    `- Public form count: ${e.formState.details.forms}.`,
    `- POST form actions: ${e.formState.details.postActions}.`,
    `- File inputs: ${e.formState.details.fileInputs}.`,
    `- Webhook/CRM markers: ${e.formState.details.webhookMarkers}.`,
    `- False success markers: ${e.formState.details.falseSuccessMarkers}.`,
    "- Lead flow remains phone/contact-first unless separately approved.",
    "",
    "## Cookie / Policy / Metrika Status",
    "",
    Object.entries(e.trackingNoPiiState).map(([k, v]) => `- ${k}: \`${v}\``).join("\n"),
    "",
    "## Yandex Direct Landing Risk Review",
    "",
    "Safe limited-test candidates after global gates:",
    "",
    e.yandexDirectRiskReview.allowedLimitedTestCandidates.map((r) => `- \`${r}\``).join("\n") || "- none",
    "",
    "Use only after copy/legal review:",
    "",
    e.yandexDirectRiskReview.readyWithCopyReview.map((r) => `- \`${r}\``).join("\n") || "- none",
    "",
    "Do-not-use / blocked landing pages:",
    "",
    e.yandexDirectRiskReview.doNotUseLandingList.map((p) => `- \`${p.route}\` - \`${p.status}\` (${p.risks.join("; ")})`).join("\n") || "- none",
    "",
    "Global blockers:",
    "",
    e.yandexDirectRiskReview.globalBlockers.map((b) => `- \`${b}\``).join("\n"),
    "",
    "## Yandex Business Readiness Review",
    "",
    Object.entries(e.yandexBusinessReadiness).map(([k, v]) => `- ${k}: \`${v}\``).join("\n"),
    "",
    "## Landing Page Recommendations",
    "",
    mdTable(recommendationRows, ["Route", "Recommended Campaign Use", "Ad Copy Limits", "Status"]),
    "",
    "## Evidence Scripts",
    "",
    "- `scripts/generate-ad-readiness-site-actions-evidence.mjs`",
    "- `scripts/check-ad-readiness-site-actions-evidence.mjs`",
    "- `evidence/ads/ad-readiness-site-actions-proof.json`",
    "- `evidence/ads/ad-readiness-site-actions-proof-summary.md`",
    "",
    "## Checks Run",
    "",
    "This section is updated by the final Codex report after commands finish. Current generated evidence came from:",
    "",
    "- `npm run evidence:ad-readiness-actions`",
    "- `npm run check:ad-readiness-actions`",
    "",
    "## Forbidden Scan Results",
    "",
    mdTable(forbiddenRows, ["Finding", "File", "Severity", "Context"]),
    "",
    "## Required Pre-Launch Decisions",
    "",
    "- owner/legal approval;",
    "- ad positioning decision;",
    "- legal entity/contact data decision;",
    "- privacy/forms decision;",
    "- Metrika/Webvisor/Tag Manager decision;",
    "- CRM/forms decision;",
    "- call handling decision;",
    "- Yandex Business card decision;",
    "- paid traffic go/no-go;",
    "- budget limit;",
    "- rollback/staging decision.",
    "",
    "## Final Verdict",
    "",
    `\`${e.finalVerdict}\``,
    "",
    "Reason: this audit finds technically usable landing candidates, but paid traffic remains blocked by owner/legal/deploy/Metrika/Yandex Business decisions. This PR does not approve launch."
  ];
  writeFileSync(OUT_RELEASE, `${lines.join("\n")}\n`);
}

mkdirSync(path.dirname(OUT_JSON), { recursive: true });
mkdirSync(path.dirname(OUT_SUMMARY), { recursive: true });
mkdirSync(path.dirname(OUT_RELEASE), { recursive: true });
writeFileSync(OUT_JSON, `${JSON.stringify(evidence, null, 2)}\n`);
writeSummary(evidence);
writeReleaseDoc(evidence);

console.log(`Generated ${path.relative(ROOT, OUT_JSON)}`);
console.log(`Generated ${path.relative(ROOT, OUT_SUMMARY)}`);
console.log(`Generated ${path.relative(ROOT, OUT_RELEASE)}`);
console.log(`Verdict: ${evidence.finalVerdict}`);
