---
title: AsyncAPI
sidebar_position: 9
---

# AsyncAPI: Уведомления о статусе заявок

## Спецификация

```yaml
asyncapi: 3.0.0
info:
  title: Sportnect Notifications
  version: 1.0.0
  description: События об изменении статуса заявки (подтверждена / отклонена)

servers:
  rabbitmq:
    url: amqp://rabbitmq.sportnect.ru:5672
    protocol: amqp
    description: RabbitMQ брокер

channels:
  gameRequestProcessed:
    address: game.request.processed
    messages:
      statusUpdate:
        $ref: '#/components/messages/GameRequestProcessed'

operations:
  sendStatusUpdate:
    action: send
    channel:
      $ref: '#/channels/gameRequestProcessed'
    messages:
      - $ref: '#/channels/gameRequestProcessed/messages/statusUpdate'

components:
  messages:
    GameRequestProcessed:
      summary: Событие об изменении статуса заявки
      payload:
        type: object
        properties:
          requestId:
            type: string
            description: ID заявки
          gameId:
            type: string
            description: ID игры
          playerId:
            type: string
            description: ID игрока, подавшего заявку
          status:
            type: string
            enum: [confirmed, declined]
            description: Новый статус заявки
          timestamp:
            type: string
            format: date-time
            description: Время события
        required:
          - requestId
          - gameId
          - playerId
          - status
      examples:
        - name: Заявка подтверждена
          payload:
            requestId: REQ-001
            gameId: GM-5001
            playerId: PL-1003
            status: confirmed
            timestamp: 2025-04-14T10:00:00Z
        - name: Заявка отклонена
          payload:
            requestId: REQ-002
            gameId: GM-5002
            playerId: PL-1004
            status: declined
            timestamp: 2025-04-15T11:00:00Z