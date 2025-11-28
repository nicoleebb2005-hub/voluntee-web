# Usar uma imagem base leve do Nginx para servir arquivos estáticos
FROM nginx:alpine

# Copiar arquivos públicos do site para o diretório do Nginx
COPY public /usr/share/nginx/html

# Copiar configuração customizada do Nginx
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80
EXPOSE 80

# Nginx já inicia automaticamente, mas podemos especificar explicitamente
CMD ["nginx", "-g", "daemon off;"]

