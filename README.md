# Voluntee

Site estático que apresenta iniciativas sociais e campanhas de São Mateus, em São Paulo. O Voluntee organiza informações para que as pessoas conheçam as iniciativas e entrem em contato diretamente com elas. Não recebe doações nem cadastra voluntários.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra `http://127.0.0.1:8082`. O servidor observa os arquivos de `public/` e atualiza a página ao salvá-los.

Também há uma configuração de desenvolvimento com Docker:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Nesse caso, a porta padrão é `8080`. A configuração de produção usa Nginx e está em `Dockerfile`, `config/nginx.conf` e `render.yaml`.

## Estrutura

- `public/index.html`: apresentação e explicação de como funciona.
- `public/sobre.html`: missão, causas e valores.
- `public/ongs.html`: listagem de iniciativas.
- `public/iniciativa-*.html`: páginas individuais, com campanhas, informações e contato.
- `public/acoes.html`: ações e campanhas com filtros.
- `public/busca.html` e `public/dados.js`: busca e dados compartilhados.
- `public/historia.html`: história do bairro.
- `public/assets/css/` e `public/assets/js/`: estilos e interações em JavaScript puro.

Campos `[PREENCHER]` dependem de dados e autorização das iniciativas. Atualize também `public/dados.js` quando completar informações que apareçam na busca ou nas campanhas.
