# LingvocodeFrontend

Expo Router-проект с UI-китом **Duolingo Tactile 2.5D**.

## Запуск

```bash
npm install
npx expo start
```

Доступные проверки:

```bash
npm run typecheck
npm run lint
npm run format:check
```

Скриптов `test` и `build` в проекте нет. Для проверки production-экспорта можно
запустить `npx expo export --platform web`.

## Структура

- `src/shared/config/theme` — токены, палитры и реестр тем;
- `src/shared/lib` — тема, стили, motion-хуки и a11y-хелперы;
- `src/shared/ui` — компоненты, публичный API через `@/shared/ui`;
- `src/screens`, `src/widgets`, `src/providers` — экраны и прикладные слои;
- `src/app` — файловая маршрутизация Expo Router.

Подробное описание компонентов, механики 2.5D и правил расширения — в
[`src/shared/ui/README.md`](src/shared/ui/README.md). Дизайн-спецификация — в
[`duolingo_ui.txt`](duolingo_ui.txt).
