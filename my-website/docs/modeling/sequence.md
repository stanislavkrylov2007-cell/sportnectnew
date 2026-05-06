---
title: Sequence Diagram
sidebar_position: 2
---



```plantuml
@startuml
actor Player as "Игрок"
actor Org as "Организатор"

participant Frontend as "Frontend"
participant Backend as "Backend (API)"
database DB as "База данных"

== Подача заявки ==

Player -> Frontend: Записаться на игру (eventId)
Frontend -> Backend: POST /apply (eventId)

Backend -> DB: Получить данные события и игрока
DB --> Backend: Данные

Backend -> Backend: Проверить наличие мест и уровень

alt Условия выполнены
    Backend -> DB: Создать заявку (status: pending)
    DB --> Backend: OK
    Backend --> Frontend: 200 OK (заявка отправлена)
    Frontend -> Frontend: Показать уведомление "Заявка отправлена"
    Frontend --> Player: Уведомление (тост / всплывающее окно)
else Условия не выполнены
    Backend --> Frontend: 409 Conflict
    Frontend -> Frontend: Показать ошибку
    Frontend --> Player: Сообщение об ошибке
end

== Обработка заявки (организатор) ==

Org -> Frontend: Открыть список заявок
Frontend -> Backend: GET /applications
Backend -> DB: Получить заявки (status = pending)
DB --> Backend: Список
Backend --> Frontend: Список заявок
Frontend --> Org: Отобразить список

alt Подтверждение
    Org -> Frontend: Подтвердить заявку
    Frontend -> Backend: POST /confirm (requestId)
    Backend -> DB: Обновить статус (confirmed), уменьшить места
    DB --> Backend: OK
    Backend --> Frontend: 200 OK
    Frontend -> Frontend: Обновить UI, убрать заявку из списка
    Frontend --> Org: Показать уведомление "Заявка подтверждена"
else Отклонение
    Org -> Frontend: Отклонить заявку
    Frontend -> Backend: POST /reject (requestId)
    Backend -> DB: Обновить статус (rejected)
    DB --> Backend: OK
    Backend --> Frontend: 200 OK
    Frontend -> Frontend: Обновить UI
    Frontend --> Org: Показать уведомление "Заявка отклонена"
end
@enduml