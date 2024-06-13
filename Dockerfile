# Use a Node.js base image
FROM node:21

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json  yarn.lock ./
RUN yarn


# Copy the rest of the application code
COPY . .

# Environment variables for API URL
ENV REACT_APP_API_URL=http://localhost:3001

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
