# backend/Dockerfile
FROM node:20-alpine
WORKDIR /app

# Helpful runtime libs
RUN apk add --no-cache libc6-compat

# Install prod deps (works even if you don't have package-lock.json)
COPY package*.json ./
RUN npm install --omit=dev

# Copy source
COPY . .

ENV NODE_ENV=production
EXPOSE 8080
CMD ["npm","start"]
