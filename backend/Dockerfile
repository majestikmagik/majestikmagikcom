# backend/Dockerfile
FROM node:20-alpine AS base  
WORKDIR /app

# Helpful runtime libs
RUN apk add --no-cache libc6-compat
RUN apk --no-cache upgrade

# Install prod deps (works even if you don't have package-lock.json)
COPY package*.json ./
RUN npm install --omit=dev

# Copy source
COPY . .

ENV NODE_ENV=production
EXPOSE 8080
CMD ["npm","start"]
