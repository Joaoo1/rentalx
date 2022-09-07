FROM node

WORKDIR /usr/app

COPY package.json ./
RUN yarn

COPY . .

RUN chmod +x ./.docker/entrypoint.sh