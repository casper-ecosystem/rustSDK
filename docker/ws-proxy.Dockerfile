FROM node:24-alpine

# Set environment variables for production
ENV NODE_ENV=production
ENV NODE_PATH=/usr/local/lib/node_modules

# Optional: If you want to manage versions directly, use ARG
ARG version=latest

# Install dependencies globally
RUN npm install -g ws@$version

# Copy the server.js file into the container
COPY ./examples/frontend/angular/ws-proxy.js /app/ws-proxy.js

# Set the working directory for the container
WORKDIR /app

# Expose the port your app will run on
EXPOSE 4300

# Run the server when the container starts
CMD ["node", "ws-proxy.js"]
