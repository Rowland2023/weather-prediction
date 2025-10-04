# Use lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install static file server globally
RUN npm install -g http-server

# Copy all project files
COPY . .

# Expose port
EXPOSE 3000

# Serve the static files from the public directory (adjust if needed)
CMD ["http-server", "public", "-p", "3000"]
