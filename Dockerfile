# --- STAGE 1: Builder for Dependencies ---
# Use a Node.js image for building and installing dependencies.
# We use node:20-slim for a good balance of features and size.
FROM node:20-slim AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker layer caching
# This step only runs again if dependencies change.
COPY package*.json ./

# Install dependencies
RUN npm install

# --- STAGE 2: Production Image ---
# Use a lean base image for the final production environment
FROM node:20-slim

# Set the working directory
WORKDIR /app

# Copy production dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy the rest of the application source code
# Make sure your server.js is in the root of your project
COPY . .

# Expose the port your Express app runs on (default is often 3000 or 8080)
# Check your environment configuration (.env or server.js) and adjust if needed.
ENV PORT 5000
EXPOSE 5000

# Command to run the application
# This assumes your main entry point is 'server.js' as indicated in package.json scripts.
CMD [ "npm", "start" ]