FROM node:14-alpine

# Set environment variables for production
ENV NODE_ENV=production
ENV NODE_PATH=/usr/local/lib/node_modules

# Optional: If you want to manage versions directly, use ARG
ARG version=latest

# Install dependencies globally
RUN npm install -g cors-anywhere@$version

# Copy the server.js file into the container
COPY ./docker/server.js /app/server.js

# Set the working directory for the container
WORKDIR /app

# Expose the port your app will run on
EXPOSE 11100

# Run the server when the container starts
CMD ["node", "server.js"]