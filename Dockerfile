FROM node:15.12.0-buster-slim AS builder

RUN apt-get update

RUN apt-get install -y openssl

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli

RUN npm install prisma -d

USER node

WORKDIR /home/node/app