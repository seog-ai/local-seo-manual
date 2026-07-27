# syntax=docker/dockerfile:1
# The Local SEO Manual (Docusaurus static site) — multi-stage production image.
# Built by Coolify (build pack: dockerfile, base directory /). Serves the
# pre-built static site with `docusaurus serve` on port 3007.

### Builder — full deps + docusaurus build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
# --include=dev: Coolify injects NODE_ENV=production as a build-time ENV, which
# would otherwise make `npm ci` skip devDependencies (the Docusaurus tsconfig +
# type packages the .ts config/build rely on).
RUN npm ci --include=dev
COPY . .
RUN npm run build

### Runner — static server over the built site
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/docusaurus.config.ts ./
COPY --from=builder /app/sidebars.ts ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/static ./static
EXPOSE 3007
CMD ["npx", "docusaurus", "serve", "--port", "3007", "--host", "0.0.0.0", "--no-open"]
