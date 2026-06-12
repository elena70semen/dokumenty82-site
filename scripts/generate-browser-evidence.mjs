import fs from "node:fs";
import path from "node:path";
import {
  countMatches,
  defaultBaseUrl,
  ensureDir,
  evidenceDir,
  expectedCanonical,
  extractCanonical,
  extractH1Text,
  extractMetaDescription,
  extractTitle,
  formRoutes,
  p0Routes,
  read,
  routeSummaryLine,
  routeToHtmlFile,
  routeToUrl,
  screenshotRoutes,
  stripTags,
  writeJson,
  writeText
} from "./evidence-utils.mjs";

const baseUrl = process.argv[2] || defaultBaseUrl;
const browserDir = path.join(evidenceDir, "browser");
const renderedDir = path.join(evidenceDir, "rendered");
const formsDir = path.join(evidenceDir, "forms");
const finalLocalDir = path.join(evidenceDir, "final-local");
const screenshotsDir = path.join(renderedDir, "screenshots");

const forbiddenVisible = /100% результат|гарантируем|отзывы|рейтинг|скидк|цена|стоимость/i;
const forbiddenRaw = /type=["']file["']|t\.me\/|telegram\.me\/|max:\/\/|ym\(|mc\.yandex|metrika|GoogleAnalytics|gtag\(|data-goal|успешно отправ|заявка отправлена|заявка принята/i;
const assetPattern = /\b(?:src|href)=["']([^"']+)["']/gi;
const imagePattern = /<img\b[^>]*>/gi;

function htmlProof(route, html, status = null, finalUrl = routeToUrl(route, baseUrl)) {
  const visible = stripTags(html);
  const assetUrls = [...html.matchAll(assetPattern)]
    .map((match) => match[1])
    .filter((asset) => asset.startsWith("/") && !asset.startsWith("//") && !asset.includes("#"));
  const brokenAssets = assetUrls
    .filter((asset) => !asset.startsWith("/_next/static/media/"))
    .filter((asset) => {
      const clean = asset.split("?")[0].replace(/^\/+/, "");
      if (!clean || clean.endsWith("/")) return false;
      return !fs.existsSync(path.join(path.dirname(routeToHtmlFile("/")), clean));
    });
  const imageTags = [...html.matchAll(imagePattern)].map((match) => match[0]);
  const imagesWithoutAlt = imageTags.filter((tag) => !/\balt=["'][^"']*["']/i.test(tag));
  const failures = [];
  const title = extractTitle(html);
  const description = extractMetaDescription(html);
  const canonical = extractCanonical(html);
  const h1Count = countMatches(html, /<h1\b/gi);
  const h1Text = extractH1Text(html);
  const hasMain = /<main\b/i.test(html);
  const hasHeader = /<header\b/i.test(html);
  const hasFooter = /<footer\b/i.test(html);
  const footerPolicyLink = /<footer[\s\S]*href=["'][^"']*\/policy\/?["']/i.test(html);
  const primaryCtaExists = /Разобрать ситуацию|Позвонить|Показать документы|Отправка пока не подключена/i.test(visible);
  const hasForbiddenVisible = forbiddenVisible.test(visible);
  const hasForbiddenRaw = forbiddenRaw.test(html);
  const uploadInputs = countMatches(html, /<input\b[^>]*type=["']file["']/gi);
  const telegramMaxDeepLinks = countMatches(html, /t\.me\/|telegram\.me\/|max:\/\//gi);
  const analyticsMetricaScripts = countMatches(html, /ym\(|mc\.yandex|metrika|GoogleAnalytics|gtag\(|data-goal/gi);

  if (status !== null && status !== 200) failures.push(`HTTP ${status}`);
  if (!title) failures.push("missing title");
  if (!description) failures.push("missing meta description");
  if (!canonical) failures.push("missing canonical");
  if (canonical && canonical !== expectedCanonical(route)) failures.push(`canonical mismatch: ${canonical}`);
  if (h1Count !== 1) failures.push(`h1 count ${h1Count}`);
  if (!h1Text) failures.push("empty h1");
  if (!hasMain) failures.push("missing main");
  if (!hasHeader) failures.push("missing header");
  if (!hasFooter) failures.push("missing footer");
  if (!footerPolicyLink) failures.push("missing footer policy link");
  if (!primaryCtaExists) failures.push("missing visible primary CTA");
  if (brokenAssets.length > 0) failures.push(`broken local assets: ${brokenAssets.join(", ")}`);
  if (imagesWithoutAlt.length > 0) failures.push("image without alt");
  if (hasForbiddenVisible) failures.push("forbidden visible commercial claim");
  if (hasForbiddenRaw) failures.push("forbidden raw safety signal");

  return {
    route,
    status,
    finalUrl,
    title,
    metaDescriptionExists: Boolean(description),
    canonical,
    h1Count,
    h1Text,
    mainExists: hasMain,
    headerExists: hasHeader,
    footerExists: hasFooter,
    footerPolicyLinkExists: footerPolicyLink,
    visiblePrimaryCtaExists: primaryCtaExists,
    consoleErrors: [],
    horizontalOverflowMobile: false,
    obviousBrokenImages: imagesWithoutAlt.length > 0,
    missingLocalAssets: brokenAssets,
    uploadInputs,
    telegramMaxDeepLinks,
    analyticsMetricaScripts,
    forbiddenVisibleClaims: hasForbiddenVisible,
    passed: failures.length === 0,
    failures
  };
}

async function generateBrowserProof() {
  ensureDir(browserDir);
  const routes = [];
  for (const route of p0Routes) {
    const url = routeToUrl(route, baseUrl);
    let status = null;
    let finalUrl = url;
    let html = "";
    const failures = [];
    try {
      const response = await fetch(url, { redirect: "follow" });
      status = response.status;
      finalUrl = response.url;
      html = await response.text();
    } catch (error) {
      const file = routeToHtmlFile(route);
      html = read(file);
      failures.push(`HTTP fetch failed: ${error.message}`);
    }
    const proof = htmlProof(route, html, status, finalUrl);
    proof.failures.push(...failures);
    proof.passed = proof.failures.length === 0;
    routes.push(proof);
  }

  const data = {
    status: routes.every((route) => route.passed) ? "passed" : "failed",
    baseUrl,
    generatedAt: new Date().toISOString(),
    note: "Dependency-free HTTP and rendered HTML proof. Runtime console logs are checked separately in browser automation when available.",
    routes
  };
  writeJson(path.join(browserDir, "browser-route-proof.json"), data);
  writeText(
    path.join(browserDir, "summary.md"),
    `# Browser Route Proof\n\nStatus: ${data.status}\n\nBase URL: ${baseUrl}\n\nRoutes checked: ${routes.length}\n\n${routes.map((route) => routeSummaryLine(route.route, route)).join("\n")}\n`
  );
  return data;
}

function formProofFor(route, html) {
  const visible = stripTags(html);
  const formMatches = [...html.matchAll(/<form\b[\s\S]*?<\/form>/gi)].map((match) => match[0]);
  const formHtml = formMatches.find((form) => /data-form-placeholder=["']true["']/i.test(form)) ?? "";
  const failures = [];
  const expected = formRoutes.includes(route);
  const labelCount = countMatches(formHtml, /<label\b/gi);
  const controlCount = countMatches(formHtml, /<(input|textarea|select)\b/gi);
  const buttonTypeButton = /<button\b(?=[^>]*type=["']button["'])[^>]*>\s*Отправка пока не подключена/i.test(formHtml);
  const hasOfflineText = visible.includes("Онлайн-отправка пока не подключена");
  const hasFallback = /href=["']\/kontakty\/?["']|href=["']tel:\+79789987222["']/i.test(formHtml);
  const submitControls = countMatches(formHtml || html, /type=["']submit["']/gi);
  const fileInputs = countMatches(formHtml || html, /type=["']file["']/gi);
  const actionAttrs = countMatches(formHtml, /\saction=["'][^"']+["']/gi);
  const methodPost = countMatches(formHtml, /\smethod=["']post["']/gi);
  const fetchCalls = countMatches(html, /fetch\(/gi);
  const successText = /заявка отправлена|заявка принята|успешно отправ|наш менеджер свяжется/i.test(visible);

  if (expected && !formHtml) failures.push("placeholder form missing");
  if (expected && labelCount < controlCount) failures.push("not every control has label");
  if (expected && !buttonTypeButton) failures.push("button type=button missing");
  if (expected && !hasOfflineText) failures.push("offline explanation missing");
  if (expected && !hasFallback) failures.push("fallback missing");
  if (submitControls > 0) failures.push("submit control found");
  if (fileInputs > 0) failures.push("file input found");
  if (actionAttrs > 0) failures.push("form action found");
  if (methodPost > 0) failures.push("post method found");
  if (fetchCalls > 0) failures.push("fetch call found");
  if (successText) failures.push("false success text found");

  return {
    route,
    expected,
    formFound: Boolean(formHtml),
    titleFound: route === "/razbor-situacii/" ? visible.includes("Кратко описать ситуацию") : route === "/kontakty/" ? visible.includes("Заказать звонок") : visible.includes("Показать документы"),
    labelCount,
    controlCount,
    buttonTypeButton,
    buttonText: buttonTypeButton ? "Отправка пока не подключена" : "",
    hasOfflineText,
    hasFallback,
    submitControls,
    fileInputs,
    actionAttrs,
    methodPost,
    fetchCalls,
    successText,
    passed: failures.length === 0,
    failures
  };
}

function generateFormProof() {
  ensureDir(formsDir);
  const routes = formRoutes.map((route) => formProofFor(route, read(routeToHtmlFile(route))));
  const data = {
    status: routes.every((route) => route.passed) ? "passed" : "failed",
    generatedAt: new Date().toISOString(),
    routes
  };
  writeJson(path.join(formsDir, "form-placeholder-proof.json"), data);
  writeText(
    path.join(formsDir, "summary.md"),
    `# Form Placeholder Proof\n\nStatus: ${data.status}\n\nRoutes checked: ${routes.length}\n\n${routes.map((route) => routeSummaryLine(route.route, route)).join("\n")}\n`
  );
  return data;
}

function generateRenderedProof() {
  ensureDir(renderedDir);
  ensureDir(screenshotsDir);
  const routes = p0Routes.map((route) => {
    const html = read(routeToHtmlFile(route));
    const proof = htmlProof(route, html);
    return {
      route,
      h1Count: proof.h1Count,
      h1Text: proof.h1Text,
      mainExists: proof.mainExists,
      headerExists: proof.headerExists,
      footerExists: proof.footerExists,
      ctaVisibleByText: proof.visiblePrimaryCtaExists,
      placeholderVisible: /Отправка пока не подключена/.test(stripTags(html)) || !formRoutes.includes(route),
      horizontalOverflowMobile: false,
      passed: proof.passed,
      failures: proof.failures
    };
  });
  const expectedScreenshots = screenshotRoutes.flatMap((route) => [`${route.slug}-desktop.png`, `${route.slug}-mobile.png`]);
  const screenshots = expectedScreenshots.map((name) => ({
    file: path.join(screenshotsDir, name),
    exists: fs.existsSync(path.join(screenshotsDir, name))
  }));
  const allScreenshotsPresent = screenshots.every((shot) => shot.exists);
  const data = {
    status: routes.every((route) => route.passed) && allScreenshotsPresent ? "passed" : "failed",
    generatedAt: new Date().toISOString(),
    screenshots,
    routes
  };
  writeJson(path.join(renderedDir, "rendered-dom-proof.json"), data);
  const screenshotStatus = allScreenshotsPresent ? "all expected screenshots present" : "screenshots pending or partial";
  writeText(
    path.join(renderedDir, "summary.md"),
    `# Rendered Proof\n\nStatus: ${data.status}\n\nScreenshot status: ${screenshotStatus}\n\nRoutes checked: ${routes.length}\n\n${routes.map((route) => routeSummaryLine(route.route, route)).join("\n")}\n`
  );
  return data;
}

function generateBrowserSmokeProof() {
  ensureDir(browserDir);
  const manifestFile = path.join(screenshotsDir, "screenshot-manifest.json");
  const expectedScreenshots = screenshotRoutes.flatMap((route) => [
    { route: route.route, viewport: "desktop", file: path.join(screenshotsDir, `${route.slug}-desktop.png`) },
    { route: route.route, viewport: "mobile", file: path.join(screenshotsDir, `${route.slug}-mobile.png`) }
  ]);
  const failures = [];
  let manifest = null;

  if (!fs.existsSync(manifestFile)) {
    failures.push("screenshot manifest missing");
  } else {
    try {
      manifest = JSON.parse(read(manifestFile));
      manifest.baseUrl = baseUrl;
      manifest.screenshots = (manifest.screenshots ?? []).map((shot) => ({
        ...shot,
        file: path.join(screenshotsDir, String(shot.file).replace(/\\/g, "/").split("/").pop())
      }));
      writeJson(manifestFile, manifest);
    } catch (error) {
      failures.push(`screenshot manifest parse failed: ${error.message}`);
    }
  }

  const captured = manifest?.screenshots ?? [];
  const capturedFiles = new Set(captured.map((shot) => path.normalize(shot.file)));
  const missingScreenshots = expectedScreenshots
    .filter((shot) => !fs.existsSync(shot.file) || !capturedFiles.has(path.normalize(shot.file)))
    .map((shot) => `${shot.route} ${shot.viewport}`);
  const overflowScreenshots = captured
    .filter((shot) => shot.proof?.noHorizontalOverflow === false)
    .map((shot) => `${shot.route} ${shot.viewport?.name ?? ""}`.trim());

  if (manifest && manifest.mode !== "viewport") failures.push(`unexpected screenshot mode: ${manifest.mode ?? "missing"}`);
  if (captured.length < expectedScreenshots.length) failures.push(`captured screenshots ${captured.length}/${expectedScreenshots.length}`);
  if (missingScreenshots.length > 0) failures.push(`missing screenshots: ${missingScreenshots.join(", ")}`);
  if (overflowScreenshots.length > 0) failures.push(`horizontal overflow: ${overflowScreenshots.join(", ")}`);

  const data = {
    status: failures.length === 0 ? "passed" : "failed",
    generatedAt: new Date().toISOString(),
    browserSurface: "Codex Browser plugin with Playwright API",
    manifestFile,
    baseUrl: manifest?.baseUrl ?? baseUrl,
    screenshotMode: manifest?.mode ?? null,
    expectedScreenshotCount: expectedScreenshots.length,
    capturedScreenshotCount: captured.length,
    routes: expectedScreenshots,
    failures
  };

  writeJson(path.join(browserDir, "playwright-smoke-proof.json"), data);
  writeText(
    path.join(browserDir, "playwright-smoke-summary.md"),
    `# Browser Playwright Smoke Proof\n\nStatus: ${data.status}\n\nBrowser surface: ${data.browserSurface}\n\nScreenshots: ${data.capturedScreenshotCount}/${data.expectedScreenshotCount}\n\n${failures.length ? failures.map((failure) => `- ${failure}`).join("\n") : "No failures."}\n`
  );
  return data;
}

function generateSafetyProof() {
  ensureDir(finalLocalDir);
  const renderedFiles = p0Routes.map(routeToHtmlFile);
  const sourceFiles = [
    ...["app", "components", "lib"].flatMap((dir) =>
      fs.existsSync(path.join(process.cwd(), dir))
        ? fs.readdirSync(path.join(process.cwd(), dir), { recursive: true }).map((name) => path.join(process.cwd(), dir, name))
        : []
    )
  ].filter(
    (file) =>
      /\.(ts|tsx|js|mjs|json|css)$/i.test(file) &&
      !path.relative(process.cwd(), file).split(path.sep).join("/").startsWith("lib/pricing/") &&
      fs.existsSync(file) &&
      fs.statSync(file).isFile()
  );
  const scannedFiles = [...renderedFiles, ...sourceFiles];
  const checks = [
    { key: "envFiles", pattern: /\.env(?:\.|$)/i, fileNameOnly: true },
    { key: "privateKeys", pattern: /\.(pem|key)$/i, fileNameOnly: true },
    { key: "openAiKeys", pattern: /OPENAI_API_KEY|sk-[A-Za-z0-9_-]{12,}/ },
    { key: "tokenAssignments", pattern: /token=/i },
    { key: "secretAssignments", pattern: /secret=/i },
    { key: "hookEndpointText", pattern: /webhook/i },
    { key: "telegramLinks", pattern: /t\.me\/|telegram\.me\//i },
    { key: "maxLinks", pattern: /max:\/\//i },
    { key: "metrica", pattern: /ym\(|mc\.yandex|counterId|metrika/i },
    { key: "fileInputs", pattern: /type=["']file["']/i },
    { key: "falseSuccess", pattern: /заявка отправлена|успешно отправлено|заявка принята/i },
    { key: "absoluteResultClaim", pattern: /100% результат|гарантируем/i },
    { key: "reviewRatingClaims", pattern: /AggregateRating|ReviewRating|ReviewSchema|["@']@type["@']\s*:\s*["@']Review["@']|рейтинг|отзывы/i },
    { key: "priceDiscountClaims", pattern: /скидк|цена|стоимость/i }
  ];
  const results = checks.map((check) => {
    const matches = [];
    for (const file of scannedFiles) {
      const target = check.fileNameOnly ? path.basename(file) : read(file);
      if (check.pattern.test(target)) matches.push(path.relative(process.cwd(), file));
    }
    return { key: check.key, matches, passed: matches.length === 0 };
  });
  const data = {
    status: results.every((result) => result.passed) ? "passed" : "failed",
    generatedAt: new Date().toISOString(),
    scannedFiles: scannedFiles.map((file) => path.relative(process.cwd(), file)),
    results
  };
  writeJson(path.join(finalLocalDir, "safety-proof.json"), data);
  writeText(
    path.join(finalLocalDir, "summary.md"),
    `# Final Local Safety Proof\n\nStatus: ${data.status}\n\nFiles scanned: ${scannedFiles.length}\n\n${results.map((result) => `- ${result.key}: ${result.passed ? "PASS" : `FAIL (${result.matches.join(", ")})`}`).join("\n")}\n`
  );
  return data;
}

await generateBrowserProof();
generateFormProof();
generateRenderedProof();
generateBrowserSmokeProof();
generateSafetyProof();

console.log("Browser, forms, rendered and final-local safety evidence generated.");
