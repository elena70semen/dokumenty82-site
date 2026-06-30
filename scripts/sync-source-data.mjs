import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

async function findRepoRoot(startDir) {
  let dir = path.resolve(startDir);

  while (true) {
    try {
      await readFile(path.join(dir, "docs", "rebuild", "seo-contract.json"), "utf8");
      return dir;
    } catch {
      const parent = path.dirname(dir);
      if (parent === dir) {
        throw new Error("Cannot find docs/rebuild/seo-contract.json in cwd or parent directories");
      }
      dir = parent;
    }
  }
}

const root = await findRepoRoot(process.cwd());
const sourceRoot = path.join(root, "source");
const contract = JSON.parse(await readFile(path.join(root, "docs", "rebuild", "seo-contract.json"), "utf8"));

const sourceDataDir = path.join(sourceRoot, "src", "data");
const publicDir = path.join(sourceRoot, "public");
await mkdir(sourceDataDir, { recursive: true });
await mkdir(publicDir, { recursive: true });

const pages = contract.pages
  .filter((page) => page.route !== "/404.html")
  .sort((a, b) => a.route.localeCompare(b.route, "ru"))
  .map((page) => ({
    route: page.route,
    slug: page.route === "/" ? "" : page.route.replace(/^\/|\/$/g, ""),
    inSitemap: page.inSitemap,
    title: page.title,
    description: page.description,
    robots: page.robots,
    canonical: page.canonical,
    h1: page.h1,
    ogTitle: page.ogTitle,
    ogDescription: page.ogDescription,
  }));

await writeFile(
  path.join(sourceDataDir, "routes.json"),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), pages }, null, 2)}\n`,
  "utf8",
);

await writeFile(
  path.join(sourceDataDir, "site.json"),
  `${JSON.stringify({
    siteUrl: contract.siteUrl,
    metrikaId: contract.metrikaId,
    phone: "+7 (978) 998-72-22",
    phoneHref: "tel:+79789987222",
    telegramHref: "https://t.me/+79789987222",
    maxHref: "https://max.ru/+79789640639",
    email: "info@dokumenty82.ru",
    emailHref: "mailto:info@dokumenty82.ru",
    address: "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u0440\u044b\u043c, \u0421\u0438\u043c\u0444\u0435\u0440\u043e\u043f\u043e\u043b\u044c, \u0443\u043b. \u0438\u043c. \u041c\u0430\u0442\u0435 \u0417\u0430\u043b\u043a\u0438, 1",
    subtitle: "\u0426\u0435\u043d\u0442\u0440 \u043f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u043a\u0438 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u043e\u0432",
  }, null, 2)}\n`,
  "utf8",
);

for (const file of ["robots.txt", "sitemap.xml", "favicon.ico", "favicon.png", "favicon.svg"]) {
  await cp(path.join(root, file), path.join(publicDir, file));
}

await rm(path.join(publicDir, "assets"), { recursive: true, force: true });
await cp(path.join(root, "assets"), path.join(publicDir, "assets"), { recursive: true });

console.log(JSON.stringify({
  pages: pages.length,
  sitemapPages: pages.filter((page) => page.inSitemap).length,
  data: path.relative(root, sourceDataDir).replaceAll(path.sep, "/"),
  public: path.relative(root, publicDir).replaceAll(path.sep, "/"),
}, null, 2));
