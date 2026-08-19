# Backend — Trabalhe Conosco (Verx #15535)

API REST em NestJS + Prisma + PostgreSQL para cadastro de produtores rurais, fazendas, safras e
culturas plantadas. Ver `../docs/architecture.md` para o desenho geral do projeto.

## Stack

- Node 20 + TypeScript + NestJS
- Prisma ORM + PostgreSQL
- `@nestjs/swagger` (OpenAPI em `/api/docs`)
- `class-validator` / `class-transformer`
- Jest (unit) + Supertest (e2e)

## Rodando com Docker (recomendado)

Na raiz do repositório:

```bash
docker compose up
```

Isso sobe o Postgres, roda `prisma migrate deploy` e inicia a API com hot-reload em
`http://localhost:3000`. Documentação Swagger em `http://localhost:3000/api/docs`.

Para popular o banco com dados de exemplo (produtores, fazendas, safras 2021/2022 e culturas):

```bash
docker compose exec backend npm run prisma:seed
```

## Rodando localmente (sem Docker)

Pré-requisitos: Node 20+, um PostgreSQL acessível (pode ser o do `docker compose up postgres`).

```bash
cd backend
cp .env.example .env      # ajuste DATABASE_URL se necessário
npm install
npx prisma migrate dev    # cria as tabelas
npm run prisma:seed       # (opcional) popula dados de exemplo
npm run start:dev
```

A API sobe em `http://localhost:3000`, prefixo `/api`, Swagger em `http://localhost:3000/api/docs`.

## Testes

```bash
npm test          # unit tests (validador de CPF/CNPJ, regra de área, services)
npm run test:cov  # com cobertura
npm run test:e2e  # fluxo completo via HTTP (precisa de um Postgres migrado — DATABASE_URL)
```

## Estrutura

Cada módulo de domínio (`producers`, `farms`, `harvests`, `planted-crops`, `dashboard`) segue três
camadas:

- `domain/` — regras de negócio puras, sem dependência de framework (validador de CPF/CNPJ, regra
  `agricultableArea + vegetationArea <= totalArea`).
- `application/` — services (casos de uso) e DTOs de entrada/saída.
- `infrastructure/` — controller REST e repositório Prisma.

Erros de regra de negócio são lançados como subclasses de `DomainError` (`src/common/errors`) e
traduzidos para respostas HTTP pelo `DomainExceptionFilter` (`src/common/filters`), mantendo as
camadas de domínio/aplicação livres de dependências do Nest.

## Endpoints

Prefixo `/api` em todas as rotas:

- `GET/POST /api/producers`, `GET/PATCH/DELETE /api/producers/:id`
- `GET/POST /api/farms`, `GET/PATCH/DELETE /api/farms/:id`
- `GET/POST /api/harvests`
- `GET/POST /api/planted-crops`, `DELETE /api/planted-crops/:id`
- `GET /api/dashboard/summary`

Lista completa e interativa em `/api/docs` (Swagger UI).
