const WebSocket = require('ws');
const net = require('net');
const url = require('url');

const MAX_CONNECTIONS = 100; // Max simultaneous connections
const MAX_TRANSFER_LIMIT = 10 * 1024 * 1024; // 10 MB in bytes

let currentConnections = 0;

const wsServer = new WebSocket.Server({ port: 4300 });

const allowedHosts = process.env.ALLOWED_HOSTS
  ? process.env.ALLOWED_HOSTS.split(',').map((host) => host.trim())
  : ['localhost', '127.0.0.1'];
const allowedPorts = process.env.ALLOWED_PORTS
  ? process.env.ALLOWED_PORTS.split(',').map(Number)
  : [28101, 7779];

console.log('Allowed Hosts:', allowedHosts);
console.log('Allowed Ports:', allowedPorts);

function isAllowedTarget(host, port) {
  return allowedHosts.includes(host) && allowedPorts.includes(port);
}

wsServer.on('connection', (ws, req) => {
  // Check if max connection limit is reached
  if (currentConnections >= MAX_CONNECTIONS) {
    console.warn('Max connections reached. Rejecting new connection.');
    ws.close();
    return;
  }

  // Increment the active connections counter
  currentConnections++;
  console.log(
    `New WebSocket client connected. Active connections: ${currentConnections}`,
  );

  let totalBytesTransferred = 0; // Track the total data transferred for the connection

  try {
    const queryParams = url.parse(req.url, true).query;
    const targetHost = queryParams.targetHost || 'localhost';
    const targetPort = parseInt(queryParams.targetPort, 10) || 28101;

    console.log(`Target: ${targetHost}:${targetPort}`);

    if (!isAllowedTarget(targetHost, targetPort)) {
      console.warn(`Unauthorized target: ${targetHost}:${targetPort}`);
      ws.close();
      return;
    }

    console.log(`Authorized connection to ${targetHost}:${targetPort}`);

    const tcpSocket = net.connect(targetPort, targetHost, () => {
      console.log(`Connected to TCP server at ${targetHost}:${targetPort}`);
    });

    // Relay WebSocket messages to TCP server
    ws.on('message', (message) => {
      const bufferMessage = Buffer.from(message);

      // Check if we exceed the total transfer limit
      totalBytesTransferred += bufferMessage.length;

      if (totalBytesTransferred > MAX_TRANSFER_LIMIT) {
        console.error('Data transfer limit reached. Closing connection.');
        ws.close(); // Close the WebSocket connection when the transfer limit is exceeded
        return;
      }

      tcpSocket.write(bufferMessage);
    });

    // Relay TCP server data back to WebSocket client
    tcpSocket.on('data', (data) => {
      ws.send(data);
    });

    // Handle connection closure
    ws.on('close', () => {
      currentConnections--;
      console.log(
        `WebSocket client disconnected. Active connections: ${currentConnections}`,
      );
      tcpSocket.end();
    });

    tcpSocket.on('close', () => {
      console.log('TCP connection closed');
      ws.close();
    });

    tcpSocket.on('error', (err) => {
      console.error('TCP error:', err.message);
      ws.close();
    });

    ws.on('error', (err) => {
      console.error('WebSocket error:', err.message);
      tcpSocket.end();
    });
  } catch (err) {
    console.error('Error handling WebSocket connection:', err.message);
    ws.close();
  }
});

console.log('WebSocket server listening on port 4300');
