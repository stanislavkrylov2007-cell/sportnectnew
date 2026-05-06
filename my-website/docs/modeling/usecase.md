---
title: Use Case Diagram
sidebar_position: 1
---

# Use Case Diagram

```plantuml
@startuml
left to right direction

actor "Гость" as Guest
actor "Игрок" as Player
actor "Организатор" as Org

rectangle "Sportnect" {
  usecase "Зарегистрироваться" as UC_Reg
  usecase "Войти в систему" as UC_Login
  usecase "Найти игру" as UC_Search
  usecase "Просмотреть карточку игры" as UC_View
  usecase "Записаться на игру" as UC_Join
  usecase "Отменить запись" as UC_Cancel
  usecase "Оценить игру" as UC_Rate
  usecase "Создать событие" as UC_Create
  usecase "Подтвердить заявку" as UC_Confirm
  usecase "Отклонить заявку" as UC_Reject
  usecase "Ошибка записи" as UC_JoinError
}

Guest --> UC_Reg
Guest --> UC_Login

UC_Login ..> UC_Reg : <<extend>>
UC_Reg ..> UC_Login : <<extend>>

Player -up-|> Guest

Player --> UC_Search
Player --> UC_View
Player --> UC_Join
Player --> UC_Cancel
Player --> UC_Rate

Org -up-|> Player

Org --> UC_Create
Org --> UC_Confirm
Org --> UC_Reject

UC_Join ..> UC_Search : <<include>>
UC_Join ..> UC_View : <<include>>
UC_Cancel ..> UC_Join : <<extend>>
UC_Rate ..> UC_Join : <<extend>>
UC_JoinError ..> UC_Join : <<extend>>
@enduml