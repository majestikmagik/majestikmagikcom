FROM node:20-alpine
WORKDIR /app

# Install only prod deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy source
COPY . .

ENV NODE_ENV=production
# Cloud Run provides $PORT; make sure server.js uses it
# const PORT = process.env.PORT || 8080
EXPOSE 8080

CMD ["npm", "start"]
