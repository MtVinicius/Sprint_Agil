import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'API de Reserva de Salas',
      version: '1.0.0',
      description: 'API para criação e listagem de reservas de salas de reunião',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        Reserva: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            salaId: {
              type: 'integer',
              example: 1,
            },
            inicio: {
              type: 'string',
              format: 'date-time',
              example: '2026-08-01T08:30:00Z',
            },
            fim: {
              type: 'string',
              format: 'date-time',
              example: '2026-08-01T09:30:00Z',
            },
            host: {
              type: 'string',
              example: 'João Silva',
            },
          },
          required: ['id', 'salaId', 'inicio', 'fim', 'host'],
        },
        ReservaInput: {
          type: 'object',
          properties: {
            salaId: {
              type: 'integer',
              example: 1,
            },
            inicio: {
              type: 'string',
              format: 'date-time',
              example: '2026-08-01T08:30:00Z',
            },
            fim: {
              type: 'string',
              format: 'date-time',
              example: '2026-08-01T09:30:00Z',
            },
            host: {
              type: 'string',
              example: 'João Silva',
            },
          },
          required: ['salaId', 'inicio', 'fim', 'host'],
        },
      },
    },
    paths: {
      '/reservas': {
        get: {
          summary: 'Listar todas as reservas',
          tags: ['Reservas'],
          responses: {
            '200': {
              description: 'Lista de reservas retornada com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Reserva',
                    },
                  },
                },
              },
            },
            '500': {
              description: 'Erro ao listar reservas',
            },
          },
        },
        post: {
          summary: 'Criar uma nova reserva',
          tags: ['Reservas'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ReservaInput',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Reserva criada com sucesso',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Reserva',
                  },
                },
              },
            },
            '400': {
              description: 'Data inválida ou campo obrigatório ausente',
            },
            '404': {
              description: 'Sala não encontrada',
            },
            '409': {
              description: 'Conflito de horário',
            },
            '500': {
              description: 'Erro no servidor',
            },
          },
        },
      },
    },
  },
  apis: [],
};

export default swaggerJSDoc(options);
