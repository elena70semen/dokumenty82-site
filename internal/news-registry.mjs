import fs from 'node:fs';
const current = JSON.parse(fs.readFileSync(new URL('./editorial-20261010.json', import.meta.url), 'utf8'));
// Only live publications are registered; retired URLs are in their own manifest.
export const newsItems = current.articles.filter(item => item.kind === 'news').map(item => ({
  route: item.route, date: '10 октября 2026', dateIso: current.checkedAt,
  dateModified: current.checkedAt, reviewed: '10 октября 2026', badge: 'Актуально',
  title: item.title, seoTitle: item.title, summary: item.summary,
  cardSummary: item.description, tags: item.tags,
  article: {
    sourceUrl: current.sources[item.route.includes('nds-usn') ? 'vatUsn' : 'calendar'],
    sourceTitle: item.route.includes('nds-usn') ? 'ФНС: НДС при УСН' : 'ФНС: налоговый календарь',
    paragraphs: [], sections: item.sections.map(section => ({title: section.title, paragraphs: [section.text]})),
    checklistTitle: 'Контрольный список', checklist: item.checklist, related: item.related,
    practical: [], faq: []
  }
}));
