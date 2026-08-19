# Frontend — Trabalhe Conosco (Cadastro de Produtores Rurais)

Frontend do teste técnico ([brain-ag/trabalhe-conosco](https://github.com/brain-ag/trabalhe-conosco)), escrito para
o stack pedido na vaga Fullstack Node/React Pleno: **React + TypeScript, Redux Toolkit (com RTK Query), Jest/RTL,
styled-components, Docker**. Componentes de tabela/formulário usam **Ant Design**; os gráficos do dashboard usam
**Recharts**. Ver `../docs/architecture.md` para a visão geral do projeto (frontend + backend).

## Stack

- Vite + React 18 + TypeScript
- Redux Toolkit + RTK Query (toda chamada HTTP passa por `src/services/apiSlice.ts` — sem `axios`/`fetch` manual)
- React Router
- styled-components (tema/layout) + Ant Design (tabelas e formulários)
- Recharts (os 3 gráficos de pizza do dashboard)
- MSW (Mock Service Worker) — mocks de API para dev sem backend e para os testes
- Jest + React Testing Library

## Rodando localmente

```bash
cp .env.example .env   # ajuste VITE_API_URL se o backend não estiver em localhost:3000
npm install
npm run dev             # http://localhost:5173
```

Por padrão o app espera o backend NestJS em `http://localhost:3000/api` (ver `VITE_API_URL`). Se quiser rodar o
frontend isolado, sem o backend no ar, defina `VITE_ENABLE_MOCKS=true` no `.env` — isso liga o Mock Service Worker
no browser, servindo os mesmos handlers usados nos testes (`src/mocks/handlers.ts`). Na primeira vez, gere o
service worker:

```bash
npm run msw:init
```

## Rodando via Docker (raiz do projeto)

```bash
docker compose up --build
```

O `docker-compose.yml` da raiz sobe `postgres` + `backend` (NestJS) + este `frontend`, usando o estágio
`development` do `frontend/Dockerfile` (Vite com `--host`, porta 5173, código montado como volume). O estágio
`production` do Dockerfile builda o app e serve o `dist/` via nginx (`frontend/nginx/default.conf`) — útil para um
deploy standalone da imagem, embora o compose da raiz use `development`.

## Testes

```bash
npm test              # Jest + React Testing Library
npm run test:watch
npm run test:coverage
```

Usamos **Jest** (não Vitest) para bater literalmente com o que a vaga pede ("Jest/RTL"). Como o projeto é Vite
(ESM, `import.meta.env`), o Jest roda sobre **Babel** (não `ts-jest`) via `babel.jest.config.cjs` — Babel só
precisa parsear/strippar tipos, não checar tipos, então esse par funciona bem com Jest sem exigir um transform
ESM. Um plugin Babel pequeno (`babel-plugin-import-meta-env.cjs`) reescreve `import.meta.env.X` para
`process.env.X` somente durante os testes, e mantém arquivo próprio (não `babel.config.js`) para não ser pego pelo
Vite em dev/build. Verificação de tipos roda separada, via `npm run typecheck` (`tsc --noEmit`).

Cobertura incluída:

- `src/components/organisms/ProducersTable.test.tsx` — teste de componente (RTL) da listagem de produtores,
  usando os handlers do MSW (`src/mocks/handlers.ts` + `src/mocks/server.ts`) para simular a API.
- `src/utils/documentValidator.test.ts` — validação de CPF/CNPJ (algoritmo de dígito verificador, sem lib
  externa).
- `src/utils/areaValidator.test.ts` — regra de negócio `agricultableArea + vegetationArea <= totalArea`,
  validada também no client (o backend valida de novo, ver `docs/architecture.md`).

## Estrutura

```
src/
  app/            # store Redux, hooks tipados
  components/
    atoms/        # PageTitle, SectionCard, DocumentBadge, EmptyState
    molecules/    # StatTile, ConfirmDeleteAction, PieChartCard
    organisms/    # AppLayout, ProducersTable, ProducerFormModal, FarmsTable,
                   # FarmFormModal, PlantedCropsPanel, DashboardView
  config/         # leitura de import.meta.env (único ponto de acesso)
  features/       # RTK Query: producers, farms, harvests, plantedCrops, dashboard
  mocks/          # MSW: handlers, dados em memória, setup browser/node
  pages/          # ProducersPage, ProducerFarmsPage, DashboardPage, NotFoundPage
  services/       # apiSlice (RTK Query base, injectEndpoints por feature)
  theme/          # tema styled-components + paleta de gráficos
  types/          # tipos de domínio (Producer, Farm, Harvest, PlantedCrop, DashboardSummary)
  utils/          # documentValidator (CPF/CNPJ), areaValidator, brazilStates, id
```

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Redireciona para `/producers` |
| `/producers` | Lista de produtores (tabela AntD) com criar/editar (modal) e excluir (confirmação) |
| `/producers/:id/farms` | Fazendas do produtor: lista, criar/editar fazenda (com validação de área) e gerenciar culturas plantadas por safra |
| `/dashboard` | Cards com total de fazendas/hectares + 3 gráficos de pizza (por estado, por cultura, uso do solo) |

## Desvios / decisões em relação ao contrato de API

- **Filtro de fazendas por produtor**: o contrato não define um parâmetro de busca em `GET /api/farms` (nem em
  `GET /api/planted-crops` por fazenda). O frontend busca a lista completa e filtra no cliente
  (`src/features/farms/farmsApi.ts`, `src/features/plantedCrops/plantedCropsApi.ts`). Isso funciona com o
  contrato como está; se o backend futuramente aceitar `?producerId=`/`?farmId=`, é só usar — não é obrigatório.
- **Validação de CPF/CNPJ**: implementada localmente em `src/utils/documentValidator.ts` (algoritmo padrão de
  módulo 11), em vez de uma dependência como `cpf-cnpj-validator`, para manter o pacote enxuto e 100% testável
  sem depender de uma lib externa.
- Nenhuma outra divergência dos endpoints/campos descritos em `docs/architecture.md`.
