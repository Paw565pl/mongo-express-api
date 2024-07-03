FROM node:20-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm --frozen-lockfile --prod i

COPY . .

RUN chown -R node /usr/src/app

USER node

EXPOSE 5000

CMD ["pnpm", "start"]
