# API de Reserva de Salas

API REST desenvolvida como parte de uma simulação de Sprint, com o objetivo de permitir o gerenciamento de reservas de salas de reunião.

O foco desta entrega é disponibilizar um fluxo simples de agendamento, garantindo que não existam conflitos de horário para uma mesma sala.

---

## Objetivo

Desenvolver uma API que permita:

- Consultar reservas existentes;
- Criar novas reservas;
- Impedir que duas reservas sejam realizadas para a mesma sala no mesmo horário.

---

## Regra de Negócio

Antes de criar uma reserva, o sistema deve validar se já existe outra reserva para a mesma sala cujo horário seja conflitante.

### Exemplos

ID da sala| Reserva existente | Nova reserva | Resultado |
|-------------------|--------------|-----------|----------
|1|2026-08-01 09:00 - 10:00 |2026-08-01 10:00 - 11:00 | ✅ Permitida |
|2|2026-08-01 09:00 - 10:00 | 2026-08-0109:30 - 10:30 | ❌ Conflito |
|2|2026-08-01 09:00 - 10:00 |2026-08-01 08:00 - 09:00 | ✅ Permitida |
|1|2026-08-01 09:00 - 10:00 |2026-08-01 08:30 - 09:30 | ❌ Conflito |


Considera-se que uma reserva pode iniciar exatamente no horário em que outra termina.

---

## Endpoints

### GET /reservas

Retorna todas as reservas cadastradas.

#### Response

```json
[
  {
    "idReserva": 1,
    "idSala": 101,
    "nomeSala": "Sala A",
    "dataHoraInicio": "2026-08-01T09:00:00",
    "dataHoraFim": "2026-08-01T10:00:00",
    "host": "Camila"
  }
]
```

#### Status Codes

| Código | Descrição |
|---------|-----------|
| 200 | Consulta realizada com sucesso |
| 500 | Erro interno do servidor |

---

### POST /reservas

Cria uma nova reserva.

#### Request

```json
{
  "idSala": 101,
  "dataHoraInicio": "2026-08-01T10:00:00",
  "dataHoraFim": "2026-08-01T11:00:00",
  "host": "Camila"
}
```

#### Response

```json
{
  "idReserva": 2,
  "idSala": 101,
  "nomeSala": "Sala A",
  "dataHoraInicio": "2026-08-01T10:00:00",
  "dataHoraFim": "2026-08-01T11:00:00",
  "host": "Camila"
}
```

#### Status Codes

| Código | Descrição |
|---------|-----------|
| 201 | Reserva criada com sucesso |
| 400 | Campo obrigatório ausente ou data/hora inválida |
| 404 | Sala não encontrada |
| 409 | Conflito de horário |
| 500 | Erro interno do servidor |

---

## Critérios de Aceite

- Permitir consultar todas as reservas cadastradas.
- Permitir criar uma reserva quando a sala estiver disponível.
- Impedir reservas com horários sobrepostos para a mesma sala.
- Validar campos obrigatórios.
- Validar datas e horários.
- Retornar os códigos HTTP adequados para cada cenário.

---

## Tecnologias

- Node.js
- Express
- JavaScript

---

## Estrutura do Projeto

```
seed/
src/
├── controllers/
├── docs/
├── models/
├── routes/
└── index.js
```

---

## Como executar

```bash
# Clonar o projeto

git clone https://github.com/seu-usuario/reserva-salas-api.git

# Entrar na pasta

cd reserva-salas-api

# Instalar dependências

npm install

# Executar

npm start
```

---

## Fluxo da API

```
Cliente
   │
   ▼
GET /reservas
   │
Visualiza reservas existentes
   │
   ▼
POST /reservas
   │
   ▼
Validação de conflito
   │
 ┌───────┴────────┐
 │                │
 ▼                ▼
Sem conflito   Com conflito
 │                │
201 Created    409 Conflict
```

---

