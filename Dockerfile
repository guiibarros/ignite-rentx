# Usar Imagem NodeJS versão 14 - Fermium
FROM node:fermium

# Onde a aplicação estará no container
WORKDIR /usr/app

# Copiar o package.json e em seguida, instalar as dependências
COPY package.json ./
RUN npm install

# Copiar tudo da pasta local exceto os arquivos e pastas citados em '.dockerignore'
COPY . .

# Expor a porta 3333 do container e então executar o script 'dev'
EXPOSE 3333
CMD ["npm", "run", "dev"]

# docker build -t rentx - construir container com tag 'rentx'
# docker logs -f (nome do container) ver logs do container e seguir (--follow)
# docker ps - listar todos os containers
# docker ps -a - listar todos os container incluindo os parados
# docker rm (id do container) - remover container
# docker start (id do container) - iniciar container
# docker stop (id do container) - parar container
# docker exec -it (nome/id do container) /bin/bash - acessar shell do container