# Plano do projeto — Bate-Papo (Web)

Este repositório começa pela UI (HTML/SCSS/React) e evolui depois para integração com backend via WordPress (API).

## Objetivo

- Entregar uma UI moderna e responsiva para chat 1:1.
- Permitir múltiplas conversas por usuário (lista de conversas + chat ativo).
- Manter o front-end desacoplado do backend (camada de dados via API futuramente).

## Escopo (fase atual: layout)

- Implementar o template baseado em `layout.jpg`.
- Componentização com React e SCSS (CSS Modules).
- Dados mockados (conversas e mensagens), fluxo de seleção e envio local (sem persistência).
- Responsividade: desktop (lista + chat) e mobile (1 painel por vez).

Fora do escopo agora:
- Autenticação/registro.
- Persistência, WebSocket, notificações push.
- Regras de limite por usuário.
- Convites por link (somente desenho técnico futuro).

## Milestones

1. **Base do front-end**: Vite + React + SCSS, design tokens, layout responsivo.
2. **Componentes do chat**: lista de conversas, cabeçalho, bolhas, composer.
3. **Estados e UX**: empty states, loading skeletons, erros e acessibilidade.
4. **Integração API (WP)**: serviços, cache, paginação, autenticação.
5. **Convites por link**: geração/validação, permissões e expiração.
6. **Hardening**: testes, CI, observabilidade, rate limiting (quando houver backend).

## Arquitetura de UI (proposta)

- `src/features/conversations/*`: lista, busca, ações.
- `src/features/chat/*`: mensagens, composer, header.
- `src/components/*`: componentes reutilizáveis (ícones, avatar, etc).
- `src/data/*`: mocks (remover quando API entrar).
- `src/styles/*`: tokens globais, reset leve.

## Modelo de dados (futuro)

- `Conversation`: representa um relacionamento 1:1, com `participant` (o “outro lado”).
- `Message`: pertence a uma `Conversation` (id), com `author` (`me|other`) e `createdAt`.
- O usuário pode ter N conversas, mas o chat aberto sempre é 1 conversa por vez.

## Integração com WordPress (futuro)

- Criar um `src/services/apiClient.ts` com:
  - baseURL configurável por env (`VITE_API_BASE_URL`)
  - headers seguros, timeout e tratamento de erros
- Normalizar respostas e mapear para os tipos do app (`src/types/*`).
- Camada de cache:
  - sugerido: TanStack Query (decidir quando a API entrar)

## Convites por link (futuro)

- Conceito: links únicos por conversa (ou por “contato”), com expiração e escopo.
- Requisitos mínimos:
  - token opaco, armazenado/validado no backend
  - expiração + revogação
  - limite de uso (opcional)
- UX:
  - tela para “entrar via convite”
  - feedback claro de validade/expiração

## Qualidade e padrões

- Acessibilidade: botões reais, labels, foco visível, contraste.
- Segurança: sem HTML dinâmico, validações no input, evitar dependências desnecessárias.
- Performance: virtualização se lista/mensagens crescerem; imagens/avatars otimizados.

## Próximos passos (curto prazo)

- Refinar o pixel-perfect do template (spacing, fontes e sombras).
- Adicionar estados: sem conversas, sem mensagens, carregando e erro.
- Definir navegação (se `react-router` será necessário) quando entrar “convite por link”.

