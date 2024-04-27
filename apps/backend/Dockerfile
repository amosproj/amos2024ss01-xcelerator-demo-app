FROM node:20-alpine as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app

RUN corepack prepare pnpm@8.15.1 --activate

FROM base as installer

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

FROM base as builder

ENV NX_DEAMON="false"

COPY --from=installer /usr/src/app/node_modules ./node_modules

COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm nx build backend

FROM node:20-alpine as production

COPY --from=installer /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist/apps/backend ./dist/

EXPOSE 3000
EXPOSE 9229

CMD ["node", "./dist/main.js"]
