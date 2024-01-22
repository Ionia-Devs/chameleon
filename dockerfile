# ----- Base Stage -----
FROM docker.io/node:18-alpine as base

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# ----- Build Stage -----
FROM base as builder

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY apps/chameleon apps/chameleon
COPY data-access/db data-access/db
COPY nx.json tsconfig.base.json ./

ARG DATABASE_URL
ARG wg_public_node_url

RUN pnpm exec nx run data-access/db:generate
RUN pnpm exec nx run chameleon:wunderctl-generate

# ----- Final Stage -----
FROM base

ENV DATABASE_URL=$DATABASE_URL
ENV CI=true WG_COPY_BIN_PATH=/usr/bin/wunderctl
ENV WG_NODE_URL=http://127.0.0.1:9991 WG_NODE_INTERNAL_URL=http://127.0.0.1:9993 WG_NODE_HOST=0.0.0.0 WG_NODE_PORT=9991 WG_NODE_INTERNAL_PORT=9993 WG_SERVER_URL=http://127.0.0.1:9992 WG_SERVER_HOST=127.0.0.1 WG_SERVER_PORT=9992
ENV WG_PUBLIC_NODE_URL=${wg_public_node_url}

# Install only @wundergraph/sdk
RUN pnpm install @wundergraph/sdk

# Copy necessary built files from the build stage
COPY --from=builder /app/apps/chameleon/.wundergraph ./apps/chameleon/.wundergraph

EXPOSE 9991

CMD ["wunderctl", "start", "--wundergraph-dir=apps/chameleon/.wundergraph"]