# Stage 1: Build the frontend, and install server dependencies
FROM node:22 AS builder

WORKDIR /app

# Copy all files from the current directory
COPY . ./
RUN echo "API_KEY=PLACEHOLDER" > ./.env
RUN echo "GEMINI_API_KEY=PLACEHOLDER" >> ./.env

# Install server dependencies
WORKDIR /app/server
RUN npm install

# Install dependencies and build the frontend
WORKDIR /app
RUN npm install && npm run build
# Verify build output contains images
RUN test -d dist/assets && echo "Assets directory exists" && ls -la dist/assets/*.png || (echo "ERROR: No PNG files found in dist/assets" && exit 1)


# Stage 2: Build the final server image
FROM node:22

WORKDIR /app

#Copy server files
COPY --from=builder /app/server .
# Copy built frontend assets from the builder stage
COPY --from=builder /app/dist ./dist
# Verify dist folder was copied with images
RUN test -d dist/assets && echo "Assets directory copied successfully" && ls -la dist/assets/*.png || (echo "ERROR: Assets not found in final image" && exit 1)

EXPOSE 3000

CMD ["node", "server.js"]
