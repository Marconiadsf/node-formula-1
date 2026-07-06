<div align="center">
  <img src="./.github/assets/f1-car-banner.png" alt="Formula 1 car illustration" height="200">
  <h1 align="center"><strong>NODE FORMULA 1 API</strong></h1>
  <p align="center">
    API REST simples em <b>Node.js</b> + <b>TypeScript</b> com <b>Fastify</b>,
    servindo dados de equipes e pilotos de Fórmula 1.<br>
    Desafio de projeto da <a href="https://www.dio.me">Digital Innovation One (DIO)</a>.
  </p>
</div>

<br />

<div align="center">

[![TypeScript version][ts-badge]][typescript]
[![Node.js version][nodejs-badge]][nodejs]
[![Fastify version][fastify-badge]][fastify]

</div>

## 📖 Sobre o projeto

Este repositório é um fork do projeto [`node-formula-1`][dio-repo], de [Felipe Aguiar][felipe-github], desenvolvido como parte do lab project **"Criando uma minimal API da Fórmula 1 com Node.js e Fastify"**, da [Digital Innovation One (DIO)][dio].

O `node-formula-1` original, por sua vez, é construído sobre o boilerplate [`node-blue-boilerplate`][boilerplate-repo], também de Felipe Aguiar.

A partir do código apresentado no curso, este fork recebeu atualizações de dependências, correções e melhorias — descritas na seção abaixo.

## 🚀 Tecnologias

- [TypeScript][typescript-npm] — superset de JavaScript com tipagem estática
- [Fastify][fastify-npm] — framework web rápido e de baixo overhead
- [@fastify/cors][fastify-cors-npm] — plugin de CORS para Fastify
- [tsx][tsx-npm] — executa TypeScript diretamente no Node.js
- [tsup][tsup-npm] — empacota TypeScript sem configuração, com esbuild

## 📄 Endpoints

| Método | Rota           | Descrição                                  |
| ------ | -------------- | ------------------------------------------- |
| GET    | `/teams`       | Lista todas as equipes de F1                |
| GET    | `/drivers`     | Lista todos os pilotos                      |
| GET    | `/drivers/:id` | Busca um piloto específico pelo `id`        |

## ⚡ Scripts

- `npm run start:dev` — roda o servidor em modo desenvolvimento, com variáveis de ambiente do `.env`
- `npm run start:watch` — roda o servidor com reload automático ao salvar arquivos
- `npm run dist` — compila os arquivos TypeScript para JavaScript, na pasta `dist`
- `npm run start:dist` — compila e roda a versão compilada do projeto

## 👨‍💻 Como usar

Você vai precisar de [Git](https://git-scm.com), [Node.js v20+](https://nodejs.org/en/) e [npm v10+](https://nodejs.org/en/) instalados.

```bash
# Clone este repositório
$ git clone https://github.com/Marconiadsf/node-formula-1

# Entre na pasta do projeto
$ cd node-formula-1

# Instale as dependências
$ npm install

# Configure a porta do servidor (opcional, padrão 3333)
$ echo "PORT=3333" > .env

# Rode o servidor em modo desenvolvimento
$ npm run start:dev
```

O servidor sobe por padrão em `http://localhost:3333`.

## 🛠️ O que foi feito neste fork

A partir do código apresentado em aula, este repositório recebeu as seguintes melhorias:

- **Atualização de dependências**: reinstalação de pacotes para versões mais recentes compatíveis, resolvendo desatualização do boilerplate original
- **Correção de compatibilidade do CORS**: ajuste do `@fastify/cors` para funcionar com o upgrade de major version do Fastify (v4 → v5)
- **Tratamento de erro na inicialização do servidor**: o processo antes falhava silenciosamente caso o `listen()` desse erro
- **Correção de dado duplicado**: dois pilotos compartilhavam o mesmo `id`, impedindo a busca correta de um deles
- **Uso de variável de ambiente para a porta**: a porta do servidor, antes fixa no código, agora é configurável via `.env`
- **Validação de schema**: a rota `/drivers/:id` agora valida o formato do parâmetro antes de processá-lo, retornando `400 Bad Request` para entradas inválidas
- **Tratamento de erro centralizado**: erros não previstos passam por um handler único, evitando vazamento de detalhes internos e padronizando a resposta da API
- **Padronização de respostas 404**: rotas inexistentes agora retornam um JSON padronizado via `setNotFoundHandler`, mantendo consistência com o rest da API

## 🔗 Créditos e links úteis

- Repositório original: [digitalinnovationone/node-formula-1][dio-repo]
- Boilerplate base: [felipeAguiarCode/node-blue-boilerplate][boilerplate-repo]
- Autor original: [Felipe Aguiar][felipe-github]
- Fork e melhorias: [Marconiadsf](https://github.com/Marconiadsf)

[typescript]: https://www.typescriptlang.org/
[typescript-npm]: https://www.npmjs.com/package/typescript
[ts-badge]: https://img.shields.io/badge/TypeScript-5.x-blue.svg
[nodejs]: https://nodejs.org/
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2020.00-blue.svg
[fastify]: https://fastify.dev/
[fastify-npm]: https://www.npmjs.com/package/fastify
[fastify-badge]: https://img.shields.io/badge/Fastify-5.x-black.svg
[fastify-cors-npm]: https://www.npmjs.com/package/@fastify/cors
[tsx-npm]: https://www.npmjs.com/package/tsx
[tsup-npm]: https://www.npmjs.com/package/tsup
[dio-repo]: https://github.com/digitalinnovationone/node-formula-1
[dio]: https://www.dio.me
[boilerplate-repo]: https://github.com/felipeAguiarCode/node-blue-boilerplate
[felipe-github]: https://github.com/felipeAguiarCode