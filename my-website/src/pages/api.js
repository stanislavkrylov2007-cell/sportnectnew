import React from 'react';
import Layout from '@theme/Layout';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const spec = {
  openapi: "3.0.3",
  info: {
    title: "Sportnect API",
    version: "1.0.0"
  },

  security: [
    {
      bearerAuth: []
    }
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer"
      }
    },
    schemas: {
      PlayerLevel: {
        type: "string",
        enum: ["beginner", "beginner_plus", "intermediate_minus", "intermediate", "intermediate_plus", "semipro", "pro"]
      },
      GameIdList: {
        type: "array",
        items: {
          type: "string"
        },
        description: "Список ID игр"
      },
      Contacts: {
        type: "object",
        properties: {
          phone: {
            type: "string"
          },
          telegram: {
            type: "string"
          }
        }
      },
      CreateGameRequest: {
        type: "object",
        required: ["datetime", "address", "maxPlayers"],
        properties: {
          datetime: {
            type: "string",
            description: "2025-05-05 18:00"
          },
          durationMinutes: {
            type: "integer"
          },
          address: {
            type: "string"
          },
          levelsAllowed: {
            type: "array",
            items: {
              $ref: "#/components/schemas/PlayerLevel"
            }
          },
          ratingRequired: {
            type: "number",
            format: "float"
          },
          priceRub: {
            type: "integer"
          },
          maxPlayers: {
            type: "integer"
          },
          description: {
            type: "string"
          }
        }
      },
      CreateReviewRequest: {
        type: "object",
        required: ["toPlayerId", "rating"],
        properties: {
          toPlayerId: {
            type: "string"
          },
          rating: {
            type: "integer",
            minimum: 1,
            maximum: 5
          },
          comment: {
            type: "string"
          }
        }
      },
      Player: {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          name: {
            type: "string"
          },
          level: {
            $ref: "#/components/schemas/PlayerLevel"
          },
          rating: {
            type: "number",
            format: "float"
          },
          avatarUrl: {
            type: "string"
          },
          gamesAsOrganizer: {
            $ref: "#/components/schemas/GameIdList"
          },
          gamesAsPlayer: {
            $ref: "#/components/schemas/GameIdList"
          },
          createdAt: {
            type: "string"
          }
        }
      },
      Game: {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          createdBy: {
            type: "string"
          },
          status: {
            type: "string",
            enum: ["open", "full", "cancelled", "finished"]
          },
          datetime: {
            type: "string"
          },
          durationMinutes: {
            type: "integer"
          },
          address: {
            type: "string"
          },
          levelsAllowed: {
            type: "array",
            items: {
              $ref: "#/components/schemas/PlayerLevel"
            }
          },
          ratingRequired: {
            type: "number",
            format: "float"
          },
          priceRub: {
            type: "integer"
          },
          currentPlayers: {
            type: "integer"
          },
          maxPlayers: {
            type: "integer"
          },
          players: {
            type: "array",
            items: {
              type: "object",
              properties: {
                playerId: {
                  type: "string"
                },
                name: {
                  type: "string"
                },
                level: {
                  $ref: "#/components/schemas/PlayerLevel"
                },
                rating: {
                  type: "number"
                },
                status: {
                  type: "string"
                }
              }
            }
          },
          requests: {
            type: "array",
            items: {
              $ref: "#/components/schemas/GameRequest"
            }
          },
          description: {
            type: "string"
          },
          createdAt: {
            type: "string"
          }
        }
      },
      GameRequest: {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          playerId: {
            type: "string"
          },
          playerName: {
            type: "string"
          },
          playerLevel: {
            $ref: "#/components/schemas/PlayerLevel"
          },
          status: {
            type: "string",
            enum: ["pending", "confirmed", "declined"]
          },
          createdAt: {
            type: "string"
          }
        }
      },
      OrganizerInfo: {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          name: {
            type: "string"
          },
          rating: {
            type: "number"
          },
          contacts: {
            $ref: "#/components/schemas/Contacts"
          }
        }
      },
      Review: {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          gameId: {
            type: "string"
          },
          fromPlayerId: {
            type: "string"
          },
          fromPlayerName: {
            type: "string"
          },
          toPlayerId: {
            type: "string"
          },
          toPlayerName: {
            type: "string"
          },
          rating: {
            type: "integer"
          },
          comment: {
            type: "string"
          },
          createdAt: {
            type: "string"
          }
        }
      },
      GamesListResponse: {
        type: "object",
        properties: {
          items: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Game"
            }
          },
          total: {
            type: "integer"
          },
          limit: {
            type: "integer"
          },
          offset: {
            type: "integer"
          }
        }
      },
      ErrorResponse: {
        type: "object",
        properties: {
          code: {
            type: "integer"
          },
          message: {
            type: "string"
          }
        }
      }
    }
  },

  paths: {
    "/api/reference/levels": {
      get: {
        summary: "Список уровней игроков (публичный)",
        responses: {
          "200": {
            description: "Список уровней",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/PlayerLevel"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/games": {
      get: {
        summary: "Список игр с фильтрацией и пагинацией",
        security: [
          {
            bearerAuth: []
          }
        ],
        parameters: [
          {
            name: "status",
            in: "query",
            schema: {
              type: "string",
              enum: ["open", "full", "cancelled", "finished"]
            }
          },
          {
            name: "address",
            in: "query",
            schema: {
              type: "string"
            }
          },
          {
            name: "datetime_from",
            in: "query",
            schema: {
              type: "string"
            }
          },
          {
            name: "datetime_to",
            in: "query",
            schema: {
              type: "string"
            }
          },
          {
            name: "levels",
            in: "query",
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/PlayerLevel"
              }
            }
          },
          {
            name: "limit",
            in: "query",
            schema: {
              type: "integer",
              default: 20
            }
          },
          {
            name: "offset",
            in: "query",
            schema: {
              type: "integer",
              default: 0
            }
          }
        ],
        responses: {
          "200": {
            description: "Успешный ответ",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/GamesListResponse"
                }
              }
            }
          },
          "401": {
            description: "Не авторизован"
          }
        }
      },
      post: {
        summary: "Создать новую игру",
        security: [
          {
            bearerAuth: []
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateGameRequest"
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Игра создана",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Game"
                }
              }
            }
          },
          "400": {
            description: "Неверные данные"
          },
          "401": {
            description: "Не авторизован"
          }
        }
      }
    },
    "/api/games/{gameId}": {
      get: {
        summary: "Детали игры",
        security: [
          {
            bearerAuth: []
          }
        ],
        parameters: [
          {
            name: "gameId",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          "200": {
            description: "Успешно",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Game"
                }
              }
            }
          },
          "401": {
            description: "Не авторизован"
          },
          "404": {
            description: "Игра не найдена"
          }
        }
      },
      put: {
        summary: "Изменить игру",
        security: [
          {
            bearerAuth: []
          }
        ],
        parameters: [
          {
            name: "gameId",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "Idempotency-Key",
            in: "header",
            required: false,
            schema: {
              type: "string",
              format: "uuid"
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateGameRequest"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Игра обновлена",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Game"
                }
              }
            }
          },
          "400": {
            description: "Неверные данные"
          },
          "401": {
            description: "Не авторизован"
          },
          "403": {
            description: "Нет прав (не организатор)"
          },
          "404": {
            description: "Игра не найдена"
          },
          "409": {
            description: "Конфликт (одновременное изменение)"
          }
        }
      },
      delete: {
        summary: "Отменить игру",
        security: [
          {
            bearerAuth: []
          }
        ],
        parameters: [
          {
            name: "gameId",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          "204": {
            description: "Игра удалена"
          },
          "401": {
            description: "Не авторизован"
          },
          "403": {
            description: "Нет прав"
          },
          "404": {
            description: "Игра не найдена"
          }
        }
      }
    },
    "/api/games/{gameId}/join": {
      post: {
        summary: "Подать заявку на игру",
        security: [
          {
            bearerAuth: []
          }
        ],
        parameters: [
          {
            name: "gameId",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          "201": {
            description: "Заявка создана",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/GameRequest"
                }
              }
            }
          },
          "400": {
            description: "Нельзя записаться (нет мест / уровень не подходит / рейтинг слишком низкий)"
          },
          "401": {
            description: "Не авторизован"
          },
          "404": {
            description: "Игра не найдена"
          },
          "409": {
            description: "Конфликт (игрок уже подал заявку)"
          }
        }
      }
    },
    "/api/games/{gameId}/leave": {
      delete: {
        summary: "Отменить заявку",
        security: [
          {
            bearerAuth: []
          }
        ],
        parameters: [
          {
            name: "gameId",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          "204": {
            description: "Заявка отменена"
          },
          "401": {
            description: "Не авторизован"
          },
          "404": {
            description: "Заявка не найдена"
          }
        }
      }
    },
    "/api/games/{gameId}/requests": {
      get: {
        summary: "Список заявок (для организатора)",
        security: [
          {
            bearerAuth: []
          }
        ],
        parameters: [
          {
            name: "gameId",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          "200": {
            description: "Список заявок",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/GameRequest"
                  }
                }
              }
            }
          },
          "401": {
            description: "Не авторизован"
          },
          "403": {
            description: "Нет прав (не организатор)"
          },
          "404": {
            description: "Игра не найдена"
          }
        }
      }
    },
    "/api/games/{gameId}/requests/{requestId}": {
      patch: {
        summary: "Подтвердить / отклонить заявку",
        security: [
          {
            bearerAuth: []
          }
        ],
        parameters: [
          {
            name: "gameId",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "requestId",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "Idempotency-Key",
            in: "header",
            required: false,
            schema: {
              type: "string",
              format: "uuid"
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    enum: ["confirmed", "declined"]
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Статус обновлён",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/GameRequest"
                }
              }
            }
          },
          "400": {
            description: "Неверный статус"
          },
          "401": {
            description: "Не авторизован"
          },
          "403": {
            description: "Нет прав"
          },
          "404": {
            description: "Заявка или игра не найдены"
          },
          "409": {
            description: "Конфликт (игра уже заполнена)"
          }
        }
      }
    },
    "/api/games/{gameId}/players": {
      get: {
        summary: "Список участников игры",
        security: [
          {
            bearerAuth: []
          }
        ],
        parameters: [
          {
            name: "gameId",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          "200": {
            description: "Участники",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      playerId: {
                        type: "string"
                      },
                      name: {
                        type: "string"
                      },
                      level: {
                        $ref: "#/components/schemas/PlayerLevel"
                      },
                      rating: {
                        type: "number"
                      }
                    }
                  }
                }
              }
            }
          },
          "401": {
            description: "Не авторизован"
          },
          "404": {
            description: "Игра не найдена"
          }
        }
      }
    },
    "/api/games/{gameId}/reviews": {
      post: {
        summary: "Оставить отзыв",
        security: [
          {
            bearerAuth: []
          }
        ],
        parameters: [
          {
            name: "gameId",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "Idempotency-Key",
            in: "header",
            required: false,
            schema: {
              type: "string",
              format: "uuid"
            },
            description: "Ключ идемпотентности для предотвращения повторной обработки запроса"
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateReviewRequest"
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Отзыв создан",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Review"
                }
              }
            }
          },
          "400": {
            description: "Неверные данные"
          },
          "401": {
            description: "Не авторизован"
          },
          "404": {
            description: "Игра не найдена"
          }
        }
      }
    },
    "/api/users/{userId}/reviews": {
      get: {
        summary: "Отзывы об игроке",
        security: [
          {
            bearerAuth: []
          }
        ],
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          "200": {
            description: "Список отзывов",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Review"
                  }
                }
              }
            }
          },
          "404": {
            description: "Игрок не найден"
          }
        }
      }
    },
    "/api/users/{userId}/organizer-info": {
      get: {
        summary: "Публичная карточка организатора",
        security: [
          {
            bearerAuth: []
          }
        ],
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          "200": {
            description: "Информация об организаторе",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/OrganizerInfo"
                }
              }
            }
          },
          "404": {
            description: "Организатор не найден"
          }
        }
      }
    },
    "/api/profile": {
      get: {
        summary: "Мой профиль",
        security: [
          {
            bearerAuth: []
          }
        ],
        responses: {
          "200": {
            description: "Профиль",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Player"
                }
              }
            }
          },
          "401": {
            description: "Не авторизован"
          }
        }
      }
    },
    "/api/profile/games/organizer": {
      get: {
        summary: "Игры, где я организатор",
        security: [
          {
            bearerAuth: []
          }
        ],
        responses: {
          "200": {
            description: "Список ID игр",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/GameIdList"
                }
              }
            }
          }
        }
      }
    },
    "/api/profile/games/player": {
      get: {
        summary: "Игры, где я игрок",
        security: [
          {
            bearerAuth: []
          }
        ],
        responses: {
          "200": {
            description: "Список ID игр",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/GameIdList"
                }
              }
            }
          }
        }
      }
    }
  }
};

export default function API() {
  return (
    <Layout title="API Documentation" description="Sportnect API">
      <div style={{ padding: '20px' }}>
        <SwaggerUI spec={spec} />
      </div>
    </Layout>
  );
}