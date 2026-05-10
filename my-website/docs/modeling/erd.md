---
title: ERD
sidebar_position: 5
---

# ERD Диаграммы Sportnect

## Концептуальная модель

```plantuml
@startuml
entity Player
entity Game
entity Venue
entity GameRequest

Player ||--o{ Game : "создаёт"
Game }o--|| Venue : "проводится на"
Player ||--o{ GameRequest : "подаёт"
Game ||--o{ GameRequest : "имеет"
@enduml
```

На концептуальном уровне выделены ключевые сущности предметной области и связи между ними без детализации атрибутов. Модель используется для обсуждения структуры системы.

Роль организатора в системе рассматривается как признак пользователя, а не как отдельная сущность.

---

## Логическая модель

```plantuml
@startuml

entity Player {
  id : int <<PK>>
  --
  name : varchar
  level : enum
  rating : decimal(3,2)
  avatar_url : text
  is_organizer : boolean
  created_at : timestamptz
}

entity Venue {
  id : int <<PK>>
  --
  name : varchar
  address : text
}

entity Game {
  id : int <<PK>>
  --
  created_by : int <<FK>>
  updated_by : int <<FK>>
  venue_id : int <<FK>>
  datetime : timestamptz
  duration_minutes : int
  rating_required : decimal(3,2)
  price_rub : int
  current_players : int
  max_players : int
  description : text
  status : enum
  updated_at : timestamptz
}

entity GameLevelRequirement {
  id : int <<PK>>
  --
  game_id : int <<FK>>
  level : enum
}

entity GameRequest {
  id : int <<PK>>
  --
  game_id : int <<FK>>
  player_id : int <<FK>>
  status : enum
  created_at : timestamptz
  UNIQUE(game_id, player_id)
}

Player ||--o{ Game : "создаёт"
Game }o--|| Venue : "проводится на"
Game ||--o{ GameRequest : "имеет"
Player ||--o{ GameRequest : "подаёт"
Game ||--o{ GameLevelRequirement : "требует уровень"
@enduml
```

Логическая модель содержит сущности, атрибуты, первичные и внешние ключи, а также кратности связей.

**Применены следующие паттерны:**

- **L1 (многие-ко-многим)** – связь между Player и Game реализована через таблицу GameRequest
- **L2 (enum)** – уровни игроков и статусы. ENUM выбран, так как набор значений фиксирован и не изменяется пользователями системы.

Для соблюдения 1NF поле `levels_allowed` вынесено в отдельную таблицу GameLevelRequirement, так как хранение массивов нарушает атомарность данных.

Модель приведена к 3NF: атрибуты площадки вынесены в отдельную сущность Venue.

---

## Физическая модель (ключевые решения)

### P4 — Индексация

```plantuml
@startuml
entity game {
  id : BIGSERIAL <<PK>>
  --
  datetime : TIMESTAMPTZ
  status : game_status
  created_by : BIGINT
  updated_by : BIGINT
  updated_at : TIMESTAMPTZ
}

entity game_request {
  id : BIGSERIAL <<PK>>
  --
  game_id : BIGINT <<FK>>
  player_id : BIGINT <<FK>>
  status : request_status
  created_at : TIMESTAMPTZ
}
@enduml
```

Применён паттерн **P4 (индексация)** для оптимизации запросов.

**Индексы создаются на:**
- полях фильтрации (`status`)
- полях сортировки (`datetime`)
- внешних ключах (`game_id`, `player_id`, `created_by`)

Дополнительно введено ограничение **UNIQUE (game_id, player_id)**, предотвращающее дублирование заявок от одного игрока на одну игру.

---

### P3 — Архивирование

```plantuml
@startuml
entity game {
  id : BIGSERIAL
  --
  datetime : TIMESTAMPTZ
  status : game_status
}

entity game_archive {
  id : BIGSERIAL
  --
  datetime : TIMESTAMPTZ
  status : game_status
}

game --> game_archive : "перенос старых записей"
@enduml
```

Применён паттерн **P3 (архивирование)**.

Игры со статусом `finished` старше 1 месяца переносятся в архивную таблицу. Это снижает нагрузку на основную таблицу и уменьшает размер индексов, что ускоряет выполнение запросов.

---

### Партиционирование

```plantuml
@startuml
entity game {
  datetime : TIMESTAMPTZ
}

note right of game
  PARTITION BY RANGE (datetime)
end note
@enduml
```

Таблица `game` партиционируется по полю `datetime` (по месяцам).

**Это позволяет:**
- ускорить выборки по диапазону дат
- уменьшить размер индексов
- повысить производительность range-запросов
- упростить процесс архивирования