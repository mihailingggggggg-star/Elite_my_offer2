# Elite House — предложение по маркетингу

Одностраничный лендинг под телефон: обещанные цифры → проекты с процентом
влияния на результат → детали проекта (состав, сроки, примеры, что замеряем).

**Живая версия:** https://mihailingggggggg-star.github.io/Elite_my_offer2/

## Стек

- React 19 + TypeScript + Vite
- Framer Motion — появление блоков и bottom sheets
- Собственная CSS-система liquid glass (`src/styles.css`)

Акцентные цвета взяты из официального логотипа Elite House: `#ED6B06` / `#F17223`.

## Где что менять

| Что | Файл |
| --- | --- |
| Все цифры, методы, проекты, проценты влияния, OKR | `src/data/offer.ts` |
| Ссылки на сайт и приложение Elite Invest | `src/data/offer.ts`, поля `link.url` у `new-site` и `elite-invest` |
| Блок «Главное» (приложение, сайт, МБАНК, AR) | `src/data/offer.ts`, массив `spotlight` |
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
