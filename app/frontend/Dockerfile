# Usar a imagem node:16.14-alpine como base CHECK
FROM node:16.14-alpine

# Mudar para o diretório de trabalho /app-frontend CHECK
WORKDIR /app-frontend

# Copiar os package.json e package-lock.json para o container CHECK
COPY package*.json ./

# Instalar as dependências Node CHECK
RUN npm install

# Copiar o restante dos arquivos da aplicação para o container CHECK
COPY . .

# Sinalize que aplicação expõe a porta 3000 CHECK
EXPOSE 3000

# Configurar os comandos para iniciar a aplicação de acordo com as boas práticas CHECK
ENTRYPOINT ["npm", "start"]
CMD ["start"]

# Dica: Leia a seção Docker e Docker-compose no README para mais informações