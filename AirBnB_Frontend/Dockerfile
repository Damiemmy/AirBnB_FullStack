# FROM node:20-bookworm-slim AS builder

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# FROM nginx:alpine

# COPY --from=builder /app/out /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

FROM node:20-bookworm-slim AS builder
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

RUN npm run build


FROM node:20-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]