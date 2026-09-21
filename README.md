# Elite House — предложение по маркетингу

Одностраничный лендинг под телефон: гарантированные цифры → методы → проекты
с процентом влияния → детали проекта.

**Живая версия:** https://mihailingggggggg-star.github.io/Elite_my_offer2/

## Стек

- React 19 + TypeScript + Vite
- [liquid-glass-web-react](https://github.com/PallavAg/liquid-glass-web-react) (MIT) —
  настоящая SVG-рефракция для стеклянной линзы в первом экране
- Framer Motion — появление блоков и bottom sheets
- Собственная CSS-система liquid glass (`src/styles.css`)

Акцентные цвета взяты из официального логотипа Elite House: `#ED6B06` / `#F17223`.

## Где что менять

| Что | Файл |
| --- | --- |
| Все цифры, методы, проекты, проценты влияния, OKR | `src/data/offer.ts` |
| Ссылки на новый сайт и приложение | `src/data/offer.ts`, поля `link.url` у `new-site` и `new-app` |
| Внешний вид | `src/styles.css` |

Проценты влияния внутри каждого результата суммируются в 100%.

## Разработка

```sh
npm install
npm run dev
npm run build
```

Деплой:

```sh
GH_TOKEN=<токен с правом repo> npm run deploy
```

Скрипт собирает проект и публикует `dist` в ветку `gh-pages`, откуда
GitHub Pages его отдаёт.
