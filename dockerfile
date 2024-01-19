FROM docker.io/node:18-alpine

# These are the public node url and the database url of the wundergraph node you want to include in the generated client
ARG wg_public_node_url
ARG DATABASE_URL

# Set environment variables
ENV DATABASE_URL=$DATABASE_URL
ENV CI=true WG_COPY_BIN_PATH=/usr/bin/wunderctl
ENV WG_NODE_HOST=0.0.0.0 WG_PUBLIC_NODE_URL=${wg_public_node_url}

WORKDIR /app

# Install pnpm globally in your Docker image
RUN npm install -g pnpm

COPY . .

# Install dependencies
RUN pnpm install

# Generate Prisma client and Wundergraph client
RUN pnpm exec nx run web-app:deploy

# Expose only the node, server is private
EXPOSE 9991

CMD wunderctl start --wundergraph-dir=apps/web-app/.wundergraph
