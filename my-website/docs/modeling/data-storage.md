---
title: Технологии хранения данных
sidebar_position: 7
---

# Технологии хранения данных

## Сущности и их атрибуты

| Сущность | Атрибуты | Акторы | Характер взаимодействия |
|----------|----------|--------|------------------------|
| Player | id, name, level, rating, avatarUrl, gamesAsOrganizer, gamesAsPlayer, contacts (phone, telegram) | Игрок, Организатор | OLTP |
| Game (для списка) | id, datetime, address, levelsAllowed, currentPlayers, maxPlayers, status, priceRub, durationMinutes | Игрок, Организатор | OLTP |
| GameDetails (для карточки) | id, createdBy, datetime, durationMinutes, address, levelsAllowed, ratingRequired, priceRub, currentPlayers, maxPlayers, players (массив участников), description, status | Игрок, Организатор | OLTP |

---

## Анализ критериев хранения данных

| Критерий | Player | Game (список) | GameDetails (карточка) | Analytics (статистика по играм) |
|----------|--------|---------------|------------------------|--------------------------------|
| **1. Объем данных** | 10-100k записей (< 1 ГБ) | 250-500k (< 1 ГБ) | 250-500k (< 1 ГБ) | 1-5M записей (< 1 ГБ) |
| **2. Паттерн доступа** | OLTP | OLTP | OLTP | OLAP |
| **3. Консистентность** | Strong | Strong | Strong | Eventual |
| **4. Доступность** | 99.9% | 99.9% | 99.9% | 99.9% |
| **5. Мутируемость схемы** | Жесткая | Жесткая | Жесткая | Жёсткая |
| **6. Транзакции** | Нет | Нет | Нет | Нет |
| **7. Поиск и запросы** | По ID | Фильтрация + пагинация | По ID (по datetime, address, level) | Агрегации (COUNT, AVG, GROUP BY по играм, игрокам) |
| **8. Стоимость** | Дешево | Дешево | Дешево | Дешёво / Среднее |
| **Итоговое решение** | Реляционная БД | Реляционная БД | Реляционная БД | DWH / Data Lake / отдельная реляционная БД (PostgreSQL + индексы) |
