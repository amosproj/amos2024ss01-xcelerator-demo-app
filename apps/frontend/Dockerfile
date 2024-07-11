FROM node:20-alpine as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app

RUN corepack prepare pnpm@8.15.1 --activate

FROM base as installer

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

FROM base as builder

ARG XD_API_URL
ARG XD_SECRET_KEY

ENV NX_DEAMON="false"
ENV XD_API_URL=$XD_API_URL
ENV XD_SECRET_KEY=$XD_SECRET_KEY

COPY --from=installer /usr/src/app/node_modules ./node_modules

COPY . .

RUN pnpm nx build frontend

FROM nginx:stable-alpine as production

COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist/apps/frontend /usr/share/nginx/html

EXPOSE 80
