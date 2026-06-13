# Stage 20 PR #20 Remote Preview Review Pack

Status: `REMOTE_PREVIEW_REVIEW_READY`

`PUBLIC_LIVE_ALLOWED=false`

## PR #20

- URL: https://github.com/elena70semen/dokumenty82-site/pull/20
- State: open draft.
- Base/head: `stage19/human-review-staging-decision-pack` <- `stage20/trust-public-info-policy-readiness`.
- Head checked: `4ba9865abd74c1da5163ae7d925d3089524d23ae`.
- CI: `Site CI` passed in run `27462016030`.
- Artifact: `dokumenty82-static-preview` downloaded and inspected locally.
- Preview: served locally from the CI artifact only; no deploy URL was created.

## Artifact Checks

- Static root contained `index.html`, `robots.txt`, `sitemap.xml` and route folders.
- `/vosstanovlenie-buhucheta/index.html` was present.
- Sitemap contained 36 indexed URLs.
- Noindex foundation routes were not present in sitemap.
- Representative pages had title, description, one H1, canonical URLs on `https://dokumenty82.ru/` and expected structured data.
- No Review, AggregateRating, price, offers, openingHours, legalName or taxID schema fields were found.
- Active scan found no Metrika host/call, CRM webhook, external form action, file upload, messaging href, public-live true marker or active HTTP/3/QUIC signal.

## Rendered Preview Checks

- Checked 20 representative pages at exact CSS widths `390`, `430`, `768` and `1440`.
- Checked homepage, `/razbor-situacii/`, `/kontakty/`, `/o-proekte/`, `/policy`, hub routes and priority money routes.
- No horizontal overflow was found.
- Each checked page had one visible H1.
- Phone CTA resolved to `tel:+79789987222`.
- Mobile menu opened at 390px and showed 12 navigation/action links.
- CTA path stayed safe: `Разобрать ситуацию`, `Показать документы`, `Позвонить`, `Построить маршрут`.
- Placeholder forms had no external action and no file upload.

## What Owner Should Review

- Homepage first screen and route-group clarity.
- `/razbor-situacii/` safe first-step wording.
- `/kontakty/` address, phone, email target and document-showing wording.
- `/o-proekte/` public description and local marker.
- `/policy` wording and legal completeness.
- Phone, address, email visibility and local marker.
- Absence of prices, guarantees, reviews, legal IDs, working hours, office number and floor.

## Decisions Still Needed

- Approve NAP and local marker.
- Approve or revise `/policy`.
- Approve public email visibility.
- Decide whether CRM/forms remain off for first launch or move to a later approved stage.
- Decide analytics/Metrika later with no-PII proof and real counter approval.
- Decide staging, rollback and transport.
- Decide Search Console / Yandex Webmaster later.
- Decide paid traffic, ERIR, advertiser and legal publication details later.

## Explicit HOLD

- No merge.
- No deploy.
- No DNS change.
- No public live.
- No paid traffic.
- No analytics/Metrika activation.
- No CRM, live forms, uploads or messaging links.
- No owner/legal approval is claimed.
- `/policy` approval is not claimed.
