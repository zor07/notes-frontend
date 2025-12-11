# Notes Frontend

Веб-клиент для заметок и блокнотов с аутентификацией, редактором текста и поддержкой тёмной/светлой темы. Стек: React 18 (CRA), Redux + thunk, Ant Design 5, Remirror, axios. Сборка для продакшена разворачивается под nginx (Dockerfile и docker-compose в корне).

## Возможности
- Логин/регистрация, хранение `accessToken`/`refreshToken` в cookies, автоматическое обновление по 403.
- Список блокнотов: поиск, создание (модалка), удаление.
- Список заметок внутри блокнота: поиск, пагинация, переход к редактированию, создание и удаление.
- Редактор Remirror: заголовок + контент, автосохранение по таймеру, ручное сохранение, вкладки по заметкам, подсветка кода (TS/JS/Java/Kotlin/Python/Bash/JSON/Markdown/YAML).
- Переключатель темы (light/dark) с сохранением предпочтения в `localStorage`.

## Требования
- Node.js >= 14 и npm (локальная разработка).
- Настроенный backend, совместимый с API маршрутов `auth/*`, `notebooks/*`, `notebooks/:id/notes/*`.

## Переменные окружения
Создайте `.env` в корне (или используйте переменные среды) и укажите базовые URL API:
```
REACT_APP_API_URL_DEV=http://localhost:8080/
REACT_APP_API_URL_PROD=https://example.com/
```
`REACT_APP_API_URL_DEV` используется в режиме разработки, `REACT_APP_API_URL_PROD` — в продакшене.

## Локальный запуск
```
npm install
npm start
```
Приложение будет доступно на http://localhost:3000.

### Сборка и тесты
- `npm run build` — сборка в `build/`.
- `npm test` — тесты CRA в watch-режиме.

## Docker
Собрать образ и поднять контейнер через docker-compose:
```
docker build -t notes-ui .
docker-compose up -d
```
По умолчанию UI будет доступен на http://localhost:8482 (проброс 8482:80).

## Структура
- `src/api` — axios-интерфейсы к backend.
- `src/redux` — стор, редьюсеры для auth, блокнотов, списка заметок и редактора.
- `src/components` — UI: Header/Navbar, NotebookList, NoteList, NoteEditor, Editor (Remirror + тулбар).
- `src/contexts/ThemeContext.tsx` — переключение темы.

## Авторизация и токены
Токены сохраняются в cookies (`accessToken`, `refreshToken`). При истечении access-токена клиент запрашивает новый, повторяет запрос и обновляет куки. Logout очищает состояние и токены. 
