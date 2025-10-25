# ==============================
# Stage 1: Build Stage
# ==============================
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript to JS
RUN npm run build

# ==============================
# Stage 2: Production Stage
# ==============================
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy the built JS files from builder stage
COPY --from=builder /app/dist ./dist

# Expose the port (Render provides PORT via environment variable)
ENV PORT=3001
EXPOSE 3001

# Start the application
CMD ["node", "dist/index.js"]
