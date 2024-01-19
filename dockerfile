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

ARG wg_public_node_url
ARG DATABASE_URL

RUN pnpm exec nx run chameleon:wunderctl-generate
RUN pnpm exec nx run data-access/db:generate

# ----- Final Stage -----
FROM base

ENV DATABASE_URL=$DATABASE_URL
ENV CI=true WG_COPY_BIN_PATH=/usr/bin/wunderctl
ENV WG_NODE_HOST=0.0.0.0 WG_PUBLIC_NODE_URL=${wg_public_node_url}

# Install only @wundergraph/sdk
RUN pnpm install @wundergraph/sdk

# Copy necessary built files from the build stage
COPY --from=builder /app/apps/chameleon/.wundergraph ./apps/chameleon/.wundergraph

EXPOSE 9991

CMD ["wunderctl", "start", "--wundergraph-dir=apps/chameleon/.wundergraph"]
