# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY database/package.json ./database/
RUN npm install -g pnpm@11.1.3
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY database/package.json ./database/
RUN npm install -g pnpm@11.1.3
RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/database/prisma ./database/prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

WORKDIR /app/apps/api

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

CMD ["node", "dist/main.js"]
