# Use uma imagem oficial do Node.js como base
FROM node:16

# Defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie o arquivo package.json e o arquivo package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Compile o projeto
RUN npm run build

# Exponha a porta que a aplicação usa
EXPOSE 3000

# Defina o comando para rodar a aplicação
CMD [ "npm", "run", "start:prod" ]