# Use official Node.js image as a base
FROM node:22-alpine AS development

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Update npm
RUN npm install -g npm@11.1.0

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
# RUN npm run build

# Expose the application port
EXPOSE 3000

# Define the command to start the application
CMD ["npm", "run", "start:dev"]
