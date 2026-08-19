# Brain Agriculture — Cadastro de Produtores Rurais

## Stack

| Camada | Tecnologias |
|---|---|
| Backend | Node 20, TypeScript, NestJS, Prisma, PostgreSQL, Swagger/OpenAPI, Jest + Supertest |
| Frontend | React 18, TypeScript, Vite, Redux Toolkit + RTK Query, Ant Design, styled-components, Recharts, Jest + RTL, MSW |
| Infra | Docker / docker-compose |

Ver [docs/architecture.md](docs/architecture.md) para o modelo de domínio, as camadas do backend e as
decisões de arquitetura.

## Como rodar

Pré-requisito: Docker.

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000/api
- Swagger (OpenAPI): http://localhost:3000/api/docs
- Postgres: `localhost:5432` (já populado com um seed de exemplo)

Detalhes de execução local sem Docker, testes e variáveis de ambiente de cada parte estão em
[backend/README.md](backend/README.md) e [frontend/README.md](frontend/README.md).

## Funcionalidades

- CRUD de produtores rurais, com validação de CPF/CNPJ pelo algoritmo oficial de dígitos verificadores
- CRUD de fazendas, com a regra `área agricultável + área de vegetação ≤ área total`
- Safras e culturas plantadas por fazenda/safra
- Dashboard com total de fazendas, total de hectares e gráficos de pizza por estado, cultura e uso do solo

## Testes

```bash
# backend
cd backend && npm test && npm run test:e2e

# frontend
cd frontend && npm test
```
