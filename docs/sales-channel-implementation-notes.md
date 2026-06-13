# Sales channel implementation notes

This repository does not launch external channels. It only keeps a machine-readable readiness map for the website, approved landing routes, CTA labels, attribution and launch gates.

## Commands

```bash
npm run evidence:sales-channels
npm run check:sales-channels
npm run check:finalization
```

## Current channel status

- `READY_WITH_CONDITIONS`: Yandex organic, phone direct, walk-in, referral/manual.
- `OWNER_REQUIRED`: Yandex Business / Maps, 2GIS, directories, VK organic.
- `TRACKING_REQUIRED`: Yandex Direct.
- `STAGED`: VK paid, Dzen organic, Avito, Yandex Services.
- `BLOCKED`: Dzen paid, Telegram future, MAX future.

## Still off

- public LIVE approval;
- paid traffic;
- live forms;
- CRM submit;
- analytics / Metrica;
- local profile publication;
- Telegram/MAX public links;
- public upload.
