FROM node:alpine

# Add the following line
# to run client collectly inside docker container 
ENV CI=true

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]