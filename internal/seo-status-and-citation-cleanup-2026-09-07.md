# SEO status and external profile cleanup: 7 September 2026

Checked without starting a local web server. This note separates verified production data, Topvisor data supplied by the owner, and search-engine cache observations. The focused accounting conversion update described below was published after the initial audit.

## 1. Fresh Topvisor baseline

Sources:

- owner screenshot of project `30707226`, Yandex position check dated `07.09.2026 11:07`;
- exported workbook `https_dokumenty82_ru_Yandex_(Simferopol_ru)_(2026-09-07)_-_(2026-08-01).xlsx`, sheet `Y (Simferopol, ru)`, covering `01.08-07.09.2026`.

The exported query table contains `20` tracked queries. On 7 September it shows `6` queries in positions 1-3, `11` in positions 1-10, `4` in positions 11-30, `3` in positions 31-100, and `2` absent from the first 100 results. The arithmetic mean across the 18 found queries is `21.4`; treating missing queries as position 101 gives `29.4`.

The project-list screenshot displayed `8` queries in the top 10, while the exported table contains `11`. Use the exported rows for query-level decisions because they are auditable; treat the project-list counters as a transient or not-yet-synchronised summary.

| Query | 07.09 | 31.08 | 28.08 | 18.08 | 01.08 |
| --- | ---: | ---: | ---: | ---: | ---: |
| accounting services Simferopol | 93 | 82 | 70 | 65 | - |
| accounting support Simferopol | 97 | 89 | 90 | 66 | 61 |
| accountant for sole proprietor Simferopol | 75 | - | 9 | 5 | - |
| accountant for LLC Simferopol | - | - | - | - | - |
| reporting services Simferopol | 4 | 6 | 6 | - | - |
| simplified-tax declaration Simferopol | 1 | 7 | 3 | - | 8 |
| zero reporting for sole proprietor Simferopol | 5 | 22 | 4 | - | 95 |
| zero reporting for LLC Simferopol | 2 | 5 | 5 | 62 | - |
| sole proprietor registration Simferopol | 16 | 20 | 20 | 8 | 49 |
| LLC registration Simferopol | - | 14 | 15 | 11 | 13 |
| sole proprietor liquidation Simferopol | 5 | 7 | 6 | 6 | 21 |
| LLC liquidation Simferopol | 6 | 6 | 7 | 2 | 29 |
| change of LLC director Simferopol | 3 | 4 | 4 | 30 | 11 |
| change of LLC legal address Simferopol | 3 | 5 | 2 | 1 | 5 |
| legal address Simferopol | 10 | 9 | 9 | 10 | 23 |
| bank documents under 115-FZ Simferopol | 1 | 1 | 1 | 1 | 3 |
| response to bank request Simferopol | 29 | 28 | 1 | 1 | 29 |
| response to FNS demand Simferopol | 20 | 5 | 5 | 19 | 73 |
| accounting reconstruction Simferopol | 13 | 26 | 13 | 16 | 22 |
| tax-burden calculation Simferopol | 3 | 3 | 3 | 3 | 3 |

Verified gains since 31 August are the simplified-tax declaration (`7 -> 1`), zero reporting for sole proprietors (`22 -> 5`), zero reporting for LLCs (`5 -> 2`), and accounting reconstruction (`26 -> 13`). Stable strong queries include bank documents under 115-FZ (`1`), tax-burden calculation (`3`), and LLC liquidation (`6`). Do not rewrite these pages while they hold their positions.

The immediate investigation list is narrower:

1. LLC registration fell from `14` to outside the first 100 results.
2. Response to an FNS demand fell from `5` to `20`.
3. Response to a bank request remains at `29` after briefly reaching `1` on 18 and 28 August.
4. The broad accounting cluster remains weak at positions `75-97` or outside the first 100.

Local checks found no basic technical block on the intended landing pages: they are indexable, have self-referencing canonicals, service schema, unique titles and descriptions, and internal links. The workbook does not include ranked URLs, so it cannot prove whether Yandex selected the intended landing page. Before changing copy, verify the ranked URL and index snapshot in Yandex Webmaster for the three volatile clusters. Broad accounting queries likely need local authority and stronger external identity consistency in addition to on-page work.

### Live Yandex validation and crawler lag

Manual Yandex searches with the Simferopol region exposed several material differences from the Topvisor snapshot:

- `ответ на требование ифнс симферополь`: the intended `/otvet-na-trebovanie-ifns/` page is on the first results page, approximately the sixth organic result, not position `20` shown in the export;
- `ответ на запрос банка симферополь`: the domain holds the first organic result through `/bank-i-115-fz/`; Yandex selected the broad 115-FZ hub instead of `/otvet-na-zapros-banka/`, so the exported position `29` does not describe the domain's actual visibility for this intent;
- `регистрация ооо симферополь`: the intended page is indexed and the organization appears in the local Maps block, but the first organic page is dominated by banks, government properties, Yandex Services, directories, and aggregators;
- `бухгалтерское сопровождение симферополь`: the site is absent from the first organic page. This is the confirmed weak commercial cluster; the result page is dominated by ads, Maps, Yandex Services, Avito, 2GIS, aggregators, and exact-match local accounting domains.

Yandex Webmaster shows the 4 September reindex requests for `/buhgalterskie-uslugi/`, `/soprovozhdenie/`, `/buhgalterskoe-soprovozhdenie-ooo/`, `/registraciya-ip/`, `/likvidaciya-ooo/`, and `/bank-i-115-fz/` as `Заявка обработана`. In the `Страницы в поиске` report, the three accounting URLs are canonical and indexed, but the displayed last-visit date is still `01.09.2026`.

The VPS access logs provide a newer source of truth. Organic `YandexBot/3.0` fetched all three strengthened accounting pages on 4 September after the regional accounting rollout: `/soprovozhdenie/` from `14:57 UTC`, `/buhgalterskie-uslugi/` from `14:57 UTC`, and `/buhgalterskoe-soprovozhdenie-ooo/` from `14:59 UTC`, with repeated successful `200` responses through `15:33 UTC`. The compressed response sizes match the newer post-rollout documents rather than the 1 September versions. A 7 September `YaDirectFetcher/1.0` request only validates the advertising landing page and is not an organic indexing crawl.

Therefore the 7 September Topvisor positions were measured after the first confirmed crawl of the strengthened accounting documents. The weak broad-accounting positions cannot be attributed only to crawler lag; local commercial authority, external profile consistency, result-page competition, and landing-page conversion now carry more weight. Do not perform another same-day position check or rewrite the pages reactively. Use the Yandex Business popular-product update and external citation cleanup as the next interventions, then measure the same query set after the changes have had time to propagate.

## 2. Production and lead funnel

Verified on the VPS and through public HTTP checks on 7 September:

- active release: `/var/www/dokumenty82/releases/20260907-accounting-conversion-95fa857`;
- `nginx`, `dokumenty82-lead`, and `dokumenty82-portal` are active;
- nginx configuration test passes;
- homepage, commercial landings, offer, robots, sitemap, scripts, and styles respond with HTTP `200`;
- sitemap contains `64` URLs;
- `services.yml` contains `30` offers, is dated `2026-09-04 18:50`, and contains no `expiry` nodes;
- the TLS certificate for `dokumenty82.ru` is valid through `12.11.2026`.

There are no stored lead submissions dated 1-7 September. Two HTTP `200` responses from `/api/lead` on 6 September did not create submission directories or CRM records and therefore match the honeypot response path, not customer leads.

The Yandex campaign produced four tagged landing requests after the 4 September campaign update:

| Date | Landing | Tracking detail | Observed continuation |
| --- | --- | --- | --- |
| 05.09 | `/buhgalterskoe-soprovozhdenie-ooo/` | autotargeting | `/ceny/` |
| 05.09 | `/soprovozhdenie/` | autotargeting | none |
| 06.09 | `/buhgalterskie-uslugi/` | campaign `713957407`, term not logged | none |
| 06.09 | `/buhgalterskie-uslugi/` | campaign `713957407`, term not logged | none |
| 07.09 | `/buhgalterskoe-soprovozhdenie-ooo/` | autotargeting, mobile Safari | none |
| 07.09 | `/buhgalterskie-uslugi/` | autotargeting, desktop | none |

None of these six visits used `/api/ai-chat` or `/api/lead`. Both 7 September visitors loaded the landing and its static assets but requested no second page, which is consistent with a one-page rejection rather than a broken form. Server logs are a lower bound and are not a replacement for Metrika, but they prove that the immediate bottleneck is before a completed enquiry. Six landings are not enough to estimate a stable conversion rate.

AI chat received five requests from two browser identities: four successful requests on 5 September and one client-aborted request on 6 September. The latter produced nginx `499` and a server-side `BrokenPipeError`; the service stayed active. Treat this as a response-abandonment signal, not a confirmed AI outage.

### Separate Yandex Metrika counters

The Metrika account list shows two counters with different scopes:

- counter `60585931`, owned and managed by Yandex Business, reports activity with the organization card across Yandex Search, Maps, and other Yandex surfaces. On the checked monthly view it showed `7` visits, `13` views, `7` visitors, and one `Клик на позвонить` goal;
- counter `109869928`, owned by `OFFICE-9102`, is the website counter installed on `dokumenty82.ru`. On the same list view it showed `5` visits, `11` views, `5` visitors, and zero `Клик по телефону` goals.

These figures must not be added as if they described twelve unique website visitors. The Yandex Business counter measures organization-card interaction and can overlap with people who later visit the website. Its call-click goal records pressing the phone control, not a confirmed connected call or customer lead. Production source inspection confirms that only counter `109869928` is installed on the website; counter `60585931` is not duplicated in the site code.

Official references: [Yandex Business statistics](https://yandex.ru/support/business-priority/ru/manage/general-statistics), [organization-card events](https://www.yandex.ru/support/metrica/ru/general/events), and [website click goals](https://yandex.ru/support/metrica/ru/simple-goal/click-beta).

### Landing conversion cleanup published

The three accounting landings were reviewed at a `390 x 844` mobile viewport without starting a local server. Their quick forms are already low-friction: only the phone and privacy consent are required, while the name and workload description are optional. The confirmed mismatch is earlier in the journey. Price-intent ads can open the general accounting page, but its production first screen did not show the `from 10,000 RUB` entry price even though that value was present in the title and lower content. In addition, the second first-screen action on all three landings opened another price page instead of offering a direct contact channel.

The conversion patch keeps the indexed headings and service copy unchanged and makes only these focused changes:

- shows `от 10 000 ₽ в месяц` on the first screen of `/buhgalterskie-uslugi/`, with a retained link to the full tariff table;
- renames the general primary action from a vague service-selection label to `Рассчитать стоимость`;
- adds a first-screen phone action on the general, sole-proprietor, and LLC accounting landings;
- keeps the existing quick form contract and Yandex Metrika goals unchanged.

The static HTML, form, tracking, and strict site-audit suites pass. Commit `95fa857` was published atomically as `/var/www/dokumenty82/releases/20260907-accounting-conversion-95fa857`; only the three accounting landing documents differ from the previous release. Local and remote SHA-256 hashes match, nginx configuration passes, the nginx, lead, and portal services remain active, and all three public URLs return HTTP `200`. No application service restart was required.

The three URLs were submitted to Yandex IndexNow directly from the VPS to bypass the local VPN path. The correct root key file was verified against its public response. Yandex accepted `/buhgalterskie-uslugi/` with HTTP `202` and `/soprovozhdenie/` plus `/buhgalterskoe-soprovozhdenie-ooo/` with HTTP `200`. An initial HTTP `422` was caused by a diagnostic command selecting an unrelated root `.txt` file instead of the explicit IndexNow key; the key itself and the site were valid.

Compare `hero_cta_click`, `contact_phone`, `goal_form_start`, and `lead_submit_success` for paid accounting sessions after new traffic reaches the release. Do not call the patch successful or unsuccessful until the sample contains enough qualified visits.

### Direct search-query control: 1-7 September

The authorised Direct search-query report was rechecked on 7 September with the period set to `01-07.09.2026`, clicks greater than zero, and the report's selected micro-goal `Переход по коммерческому...`. The report contains `107` impressions, `8` clicks, `747.36 RUB` spend, and `2` recorded goal completions. The displayed `25%` conversion rate and `373.68 RUB` CPA describe that selected micro-goal, not submitted leads. VPS records and CRM data still show no customer lead for the period.

The eight paid queries were:

| Query | Trigger | Spend | Goal |
| --- | --- | ---: | ---: |
| `если счета заблокировали по 115 фз что делать и что писать в обоснование` | semantic match | 137.17 RUB | 0 |
| `рассчитать стоимость бухгалтерского обслуживания ндс сдача отчетности` | autotargeting | 132.05 RUB | 0 |
| `стоимость ведения бухгалтерского учета для ип на усн доходы` | autotargeting | 116.11 RUB | 0 |
| `бухгалтерские услуги феодосия` | autotargeting | 95.39 RUB | 1 micro-goal |
| `налог рф` | autotargeting | 79.33 RUB | 0 |
| `услуги по ведению ип` | autotargeting | 73.68 RUB | 1 micro-goal |
| query not disclosed in the report row | autotargeting | 72.79 RUB | 0 |
| `нормативный расход топлива с учетом поправочных коэффициентов` | autotargeting | 40.84 RUB | 0 |

The accounting campaign generated `610.19 RUB` of this spend. At least `120.17 RUB` was unquestionably irrelevant (`налог рф` and the fuel-consumption query), while the broad undisclosed row adds another `72.79 RUB` that cannot be qualified. The two high-intent price queries cost `248.16 RUB` without a lead. `Бухгалтерские услуги Феодосия` and `услуги по ведению ИП` are commercially relevant for the agreed Crimea-wide coverage, so they must not be excluded only because they did not submit a form in this small sample.

The campaign settings were then checked directly. Campaign `713957407` uses `Максимум кликов с ручными ставками`, payment per click, and a `1,500 RUB` weekly budget. Its configured valuable actions are the actual website lead, phone, Telegram, MAX, assigned-meeting CRM stage, and created-order CRM stage. The report's commercial-click micro-goal is not included in that campaign goal set, and automatic application of Direct recommendations remains disabled. The misleading `25%` figure is therefore a report-view issue, not evidence that bidding is being optimised for the micro-goal.

The immediate Direct action is narrow: exclude the two proven irrelevant themes and stop reading the report's commercial-click micro-goal as a lead. Do not disable all autotargeting from an eight-click sample; retain the commercially relevant accounting queries and continue query-level control.

## 3. External identity conflicts

### Critical: old Yandex Services / Performers profile

URL: `https://uslugi.yandex.ru/profile/CentrPodgotovkiDokumentov-2536333`

Current public profile still exposes:

- old name `Центр подготовки документов`;
- area `Котельниковское сельское поселение` instead of the Simferopol office;
- dead website `business-helps.ru`;
- obsolete VK and Telegram references;
- an old liquidation offer at `40 000 RUB` and statements that do not match the current site;
- personal presentation instead of the current business entity and brand.

Required outcome: claim and update the profile to the canonical data below, or unpublish it if ownership cannot be restored. This is the first external-profile priority because it is a Yandex property and directly competes for branded and service queries.

### Yandex Business product priorities

Before the 7 September cleanup, the Yandex Business catalogue contained correct service cards for `Бухгалтерское сопровождение ИП` and `Бухгалтерское сопровождение ООО`, both priced at `10 000 RUB`, but neither was marked as popular. The five popular catalogue entries were:

1. `Регистрация ИП`;
2. `Регистрация ООО`;
3. `Ответ на запрос банка`;
4. `Ответ на требование ИФНС`;
5. `Разбор ситуации по документам`.

That product mix strongly reinforced registration and incident-response intent while giving Yandex no equivalent popular-product signal for recurring accounting support. The public Maps card also uses registration and liquidation as its primary category, although accounting services are present as a secondary category. Do not change the primary category without a separate local-pack test because that could damage the registration cluster.

Completed on 7 September 2026 with owner confirmation: `Регистрация ИП` and `Разбор ситуации по документам` were removed from the popular set, and `Бухгалтерское сопровождение ИП` and `Бухгалтерское сопровождение ООО` were added. The final popular set was verified through the `Только популярные` filter and contains exactly:

1. `Бухгалтерское сопровождение ИП`;
2. `Бухгалтерское сопровождение ООО`;
3. `Регистрация ООО`;
4. `Ответ на запрос банка`;
5. `Ответ на требование ИФНС`.

### High: FIS.ru company profile

URL: `https://10341213.fis.ru/`

Current public profile still exposes the old name, dead `business-helps.ru`, old email, and outdated service copy. The page says it has not been updated for more than six months.

Required outcome: update the brand, website, email, owner details, and concise service description. Preserve the working phone and address.

### High: FirmList company listing

URL: `https://firmlist.ru/simferopol/uslugi/bukhgalterskie-uslugi-i-audit`

The search result identifies the organization as `ИП Центр Подготовки Документов` and links to `business-helps.ru`.

Required outcome: replace the name and website, then verify the category remains `Бухгалтерские услуги и аудит`.

### Search cache: business-helps.ru

Search engines still expose cached pages containing the current phone and office address. The domain currently has no A, AAAA, or CNAME record and does not serve a website. It therefore cannot redirect visitors or pass old links to `dokumenty82.ru`.

Required outcome: if the old domain is still available in an owned Webmaster/Search Console account, request removal of the obsolete URLs. Otherwise monitor disappearance after recrawl and prioritize correction of directories that still link to the dead host. Do not recreate duplicate content on the old domain.

### Foreign domain: danri-web.ru

The domain currently resolves to `155.212.142.72`, but it is not owned by this project. The VPS default virtual host returns an empty connection (`444` behavior) and the TLS handshake is rejected for the foreign SNI. The current site is no longer served under this hostname.

Required outcome: keep the isolation in place and monitor cache removal. Do not add this domain to canonical markup, redirects, or `sameAs`. Only the domain owner can correct its DNS.

## 4. Canonical profile data

Use the following values consistently when correcting external listings:

- Brand: `Документы для бизнеса`.
- Alternate historical name only where a directory supports it: `Центр подготовки документов`.
- Website: `https://dokumenty82.ru/`.
- Phone: `+7 (978) 998-72-22`.
- Public email: `info@dokumenty82.ru`.
- Address: `Республика Крым, Симферополь, ул. им. Мате Залки, 1`.
- Owner: `Индивидуальный предприниматель Барков Андрей Андреевич`.
- INN: `672908329933`.
- OGRNIP: `325670000053721`.
- Main site activity wording: accounting and tax support, reporting, business registration and liquidation, responses to tax demands, and bank documents under 115-FZ.

Do not publish unsupported guarantees, nationwide office locations, or a promise of a fixed result.

## 5. Correction copy

Short correction request for directory support:

> Please update the organization card. The current official brand is "Документы для бизнеса" and the only official website is https://dokumenty82.ru/. The card still contains the obsolete domain business-helps.ru and outdated organization information. Please retain the phone +7 (978) 998-72-22 and the Simferopol office at ul. im. Mate Zalki, 1, and replace the website, public email, and company name with the current canonical data.

Yandex Services profile note:

> The profile uses the current business phone but has an obsolete brand, website, service area, social links, and prices. Please transfer or update the profile for the current business entity, "Документы для бизнеса", Simferopol, and remove statements and offers that do not match the current public website.

### Prepared Yandex Services recovery request

Recipient: `uslugi@support.yandex.ru`

Subject: `Нет доступа к устаревшему профилю Яндекс Исполнителей № 2536333`

> Здравствуйте. Нужна помощь с восстановлением доступа к публичному профилю https://uslugi.yandex.ru/profile/CentrPodgotovkiDokumentov-2536333.
>
> В профиле опубликованы действующие телефон +7 (978) 998-72-22 и адрес офиса в Симферополе, ул. им. Мате Залки, 1, но профиль создан под неизвестным нам старым Яндекс ID. В текущем рабочем аккаунте OFFICE-9102 сервис показывает «Стать исполнителем», а не управление существующим профилем.
>
> Карточка содержит устаревшие сведения: название «Центр подготовки документов», неработающий сайт business-helps.ru, прежние социальные ссылки, неверную территорию работы, старые предложения и цены. Актуальный бренд — «Документы для бизнеса», официальный сайт — https://dokumenty82.ru/, владелец — ИП Барков Андрей Андреевич, ИНН 672908329933, ОГРНИП 325670000053721.
>
> Подскажите безопасный порядок восстановления доступа к аккаунту-владельцу или переноса управления профилем. Если восстановление или перенос невозможны, просим подсказать порядок снятия устаревшего профиля с публикации. Готовы подтвердить права на телефон, домен и организацию и предоставить необходимые документы по вашему запросу.

Yandex's current official help states that profile data are edited from the owner account and support cannot delete the profile for the owner. The request above therefore asks for account recovery or the supported ownership procedure, not for an unsupported direct deletion.

### Prepared FIS correction request

Recipient: `info@fis.ru`

Subject: `Актуализация карточки компании 10341213 на FIS.ru`

> Здравствуйте. Просим помочь восстановить доступ к карточке https://10341213.fis.ru/ либо актуализировать её данные. Сейчас карточка содержит прежнее название «Центр Подготовки Документов», неработающий сайт business-helps.ru, старый email и прежнее контактное лицо.
>
> Актуальные сведения: бренд «Документы для бизнеса»; сайт https://dokumenty82.ru/; email info@dokumenty82.ru; телефон +7 (978) 998-72-22; адрес: Республика Крым, Симферополь, ул. им. Мате Залки, 1; владелец: ИП Барков Андрей Андреевич, ИНН 672908329933, ОГРНИП 325670000053721.
>
> Просим сообщить порядок подтверждения прав и внесения изменений. Подтверждающие документы готовы предоставить по вашему запросу.

Sending these requests is an external representational action and must be confirmed immediately before submission. Preparing and reviewing the text does not alter any external profile.

## 6. Next checkpoint

1. Completed on 7 September: Yandex Webmaster confirms canonical indexed pages for LLC registration, response to an FNS demand, and response to a bank request; its last-visit dates lag the raw server logs.
2. Keep the live-search finding in view: Yandex ranks `/bank-i-115-fz/` for the bank-response intent, while the intended narrow pages remain canonical and indexed. Do not change title, H1, or body copy without a new query-level URL check.
3. Completed on 7 September: the 1-7 September Direct query report confirms `747.36 RUB` spend and two micro-goals but no lead. Exclude the two proven irrelevant themes, then continue query-level control without disabling all autotargeting from an eight-click sample.
4. Correct the Yandex Services profile first, then FIS and FirmList; the broad accounting cluster depends heavily on local commercial trust.
5. Recheck the same 20 queries after recrawl. Do not spend the remaining Topvisor balance on repeated same-day checks.
6. Run the next position measurement only after the Yandex Business and external-profile changes have had time to propagate; the required organic crawl of all three accounting pages was already confirmed on 4 September.
