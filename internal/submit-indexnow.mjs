import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const baseUrl = "https://dokumenty82.ru";
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(https:\/\/dokumenty82\.ru(?:\/[^<]*)?)<\/loc>/g)]
  .map((match) => match[1]);

const keyFiles = fs.readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isFile() && /^[A-Za-z0-9-]{8,128}\.txt$/.test(entry.name))
  .map((entry) => {
    const file = path.join(root, entry.name);
    const value = fs.readFileSync(file, "utf8").trim();
    return { name: entry.name, value };
  })
  .filter((entry) => entry.name === `${entry.value}.txt`);

if (keyFiles.length !== 1) {
  throw new Error(`Expected one valid IndexNow key file in the site root, found ${keyFiles.length}`);
}

const normalizeUrl = (value) => {
  const url = value.startsWith("http") ? new URL(value) : new URL(value, baseUrl);
  if (url.protocol !== "https:" || url.hostname !== "dokumenty82.ru") {
    throw new Error(`URL is outside dokumenty82.ru: ${value}`);
  }
  return url.href;
};

const args = process.argv.slice(2).filter((value) => value !== "--sitemap");
const urls = [...new Set((args.length ? args : sitemapUrls).map(normalizeUrl))];

if (!urls.length) throw new Error("No URLs to submit");
if (urls.length > 10000) throw new Error("IndexNow accepts at most 10000 URLs per request");

const { value: key, name: keyFileName } = keyFiles[0];
const response = await fetch("https://yandex.com/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: "dokumenty82.ru",
    key,
    keyLocation: `${baseUrl}/${keyFileName}`,
    urlList: urls,
  }),
});

const responseBody = await response.text();
console.log(`IndexNow HTTP ${response.status}; submitted URLs: ${urls.length}`);

if (![200, 202].includes(response.status)) {
  console.error(responseBody.slice(0, 1000));
  process.exitCode = 1;
}
