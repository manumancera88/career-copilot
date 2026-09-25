# Career Copilot

> Tracker de candidaturas com análise de vagas por IA, construído em Angular 21 (standalone, signals, zoneless, SSR)

## O problema

Durante minha busca por uma vaga como desenvolvedor Angular, me vi criando manualmente uma versão diferente de currículo para cada candidatura — sem nenhuma forma de acompanhar o que já tinha enviado, em que etapa cada processo estava, ou o quão bem meu perfil realmente batia com cada vaga. Career Copilot nasceu para resolver esse problema real, e ao mesmo tempo servir como demonstração prática de Angular moderno aplicado a um caso de uso concreto.

## Demo

🔗 [career-copilot-zeta-livid.vercel.app](https://career-copilot-zeta-livid.vercel.app)

## Funcionalidades

- **Kanban de candidaturas** com drag-and-drop entre 4 etapas (Aplicado, Entrevista, Oferta, Rechazado)
- **Análise de vaga com IA**: cole a descrição de uma vaga e receba requisitos-chave extraídos, um score de match contra seu perfil, e sugestões concretas de ajuste no currículo
- **Persistência local** via `localStorage`, com sincronização automática via Angular signals + `effect()`

## Stack e decisões técnicas

- **Angular 21 standalone + signals + zoneless change detection** — arquitetura sem NgModules, com estado reativo via `signal()`/`computed()` em vez do padrão `BehaviorSubject` + `async pipe`
- **Angular CDK (drag-and-drop)** — optei pelo CDK nativo do Angular em vez de uma lib de terceiros, evitando dependências desnecessárias e mantendo controle total sobre o comportamento
- **Reactive Forms tipados** (`FormBuilder.nonNullable`) — formulários com tipagem estrita, zero `any`
- **Gemini API via Vercel Functions (serverless)** — a chamada à IA nunca acontece direto do frontend: um proxy serverless mantém a API key exclusivamente no backend, nunca exposta no bundle do Angular
- **SSR (Server-Side Rendering)** — habilitado desde o início do projeto para melhor performance inicial

## Desafios técnicos resolvidos

Alguns problemas reais enfrentados durante o desenvolvimento (e não encontrados em tutoriais):

- **Proteção SSRF nova do Angular 21**: o servidor SSR passou a validar rigorosamente o header `Host`, bloqueando requisições via proxy local (`vercel dev`). Resolvido configurando `trustProxyHeaders` no `AngularNodeAppEngine` e a variável `NG_ALLOWED_HOSTS` para desenvolvimento.
- **Mudança de formato de credenciais do Google**: contas novas do Gemini API recebem chaves no formato `AQ.` (authorization key) em vez do tradicional `AIza` (standard key) — que exige autenticação via header `x-goog-api-key` em vez do parâmetro de URL usado na documentação legada.
- **Conflito de versões entre Angular CDK e Angular core**: resolvido fixando a versão do CDK compatível (`@angular/cdk@21`) em vez de instalar a última disponível.

## Rodando localmente

```bash
npm install
npm run start          # roda o frontend Angular
vercel dev             # roda frontend + função serverless de IA juntos
```

Crie um arquivo `.env` na raiz com sua própria chave gratuita do Gemini (via [Google AI Studio](https://aistudio.google.com/apikey)):

```
GEMINI_API_KEY=sua_chave_aqui
```

## Autor

Enmanuel (Manu) Mancera — [LinkedIn](https://linkedin.com/in/enmanuelmancera) · [GitHub](https://github.com/manumancera88)
