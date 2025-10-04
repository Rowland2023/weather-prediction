# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy all project files
COPY . .

# Expose port
EXPOSE 5000
CMD ["python", "app.py"]

