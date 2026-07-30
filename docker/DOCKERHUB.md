`casper-webclient` is a Docker image containing an Angular-based web client for interacting with the Casper Blockchain. This image allows users to quickly deploy and access the web client without manually setting up the Angular environment.

⚠ **WARNING**: This application is for testing and development purposes. Do NOT use private keys or perform real transactions on the mainnet unless you fully understand the security risks.

## How to Use

### Prerequisites
Before using `casper-webclient`, ensure that:
- You have Docker installed.
- You have Docker Compose installed (optional, for orchestrating multiple services).
- You can pull images from Docker Hub.

### Running the Container Standalone
If you want to run the Casper Web Client without additional services, use:

```
docker run -d --name casper-webclient -p 8080:8080 gregoshop/casper-webclient:latest
```

- `-d`: Runs the container in detached mode.
- `--name casper-webclient`: Assigns a name to the container.
- `-p 8080:8080`: Maps port 8080 of the container to port 8080 on your local machine.

Once running, access the web client at: `http://localhost:8080`

The same image is also published as `interchouette/casper-webclient:latest`.

### Using Docker Compose for Full Setup
For complete functionality, use Docker Compose to deploy `casper-webclient` along with required services:

#### Services Explained
1. **casper-webclient**: The Angular web client for interacting with the Casper Blockchain.
2. **cors-anywhere**: A proxy server to bypass CORS restrictions.
3. **ws-proxy**: A WebSocket proxy for interacting with blockchain nodes.

#### `docker-compose.yml` Example
```yaml
services:
  casper-webclient:
    image: gregoshop/casper-webclient:latest
    container_name: casper-webclient
    ports:
      - "8080:8080"
    networks:
      - casper-network

  cors-anywhere:
    image: gregoshop/cors-anywhere:latest
    container_name: cors-anywhere
    environment:
      PORT: 11100
      ORIGIN_WHITELIST: |
        http://localhost:8080,
        http://localhost:4200,
        http://127.0.0.1:8080,
        http://127.0.0.1:4200
    ports:
      - "11100:11100"
    networks:
      - casper-network

  ws-proxy:
    image: gregoshop/ws-proxy:latest
    container_name: ws-proxy
    environment:
      PORT: 4300
      ALLOWED_HOSTS: |
        localhost,
        127.0.0.1,
        172.17.0.1
      ALLOWED_PORTS: |
        28101,
        7779
    ports:
      - "4300:4300"
    networks:
      - casper-network

networks:
  casper-network:
    external: false
```

### Running the Full Setup
To start all services together, run:

```
docker-compose up -d --build
```

- `up -d`: Starts all services in detached mode.
- `--build`: Ensures images are rebuilt if needed.

Once running, the services can be accessed at:
- **Casper Web Client**: `http://localhost:8080`
- **CORS Proxy**: `http://localhost:11100`
- **WebSocket Proxy**: `http://localhost:4300`

### Stopping the Services
To stop all running services:

```
docker-compose down
```

⚠ **Reminder**: Do not use private keys or perform real transactions on the mainnet unless you are fully aware of the security risks.
