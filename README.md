# Voluntee

Site estático que apresenta duas iniciativas sociais e quatro campanhas de São Mateus, em São Paulo. O Voluntee organiza informações para que as pessoas conheçam as iniciativas e entrem em contato diretamente com elas. Não recebe doações nem cadastra voluntários.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra `http://127.0.0.1:8082`. O servidor entrega `404.html` com status 404 para endereços inexistentes. Atualize o navegador após salvar alterações.

Também há uma configuração de desenvolvimento com Docker:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Nesse caso, a porta padrão é `8080` e o servidor também mostra `404.html` com status 404. A configuração de produção usa Nginx e está em `Dockerfile`, `config/nginx.conf` e `render.yaml`. Para subir o contêiner de produção em outra porta, use `VOLUNTEE_PORT=8082 docker compose up -d --build`.

## Estrutura

- `public/index.html`: apresentação e explicação de como funciona.
- `public/sobre.html`: missão e causas.
- `public/ongs.html`: listagem de iniciativas com filtro.
- `public/iniciativa-*.html`: páginas individuais, com campanhas, informações e contato.
- `public/acoes.html`: ações e campanhas com filtros.
- `public/busca.html` e `public/assets/js/dados.js`: busca e dados compartilhados.
- `public/historia.html`: história do bairro.
- `public/404.html`: página para endereços inexistentes em produção.
- `public/assets/css/` e `public/assets/js/`: estilos e interações em JavaScript puro.

Atualize `public/assets/js/dados.js` ao alterar iniciativas ou campanhas exibidas nos cartões e na busca. Aumente o número `?v=` dos CSS e JS nas páginas após cada alteração desses arquivos.
