const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const { fork } = require('child_process');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 728,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
    icon: path.join(__dirname, 'favicon.png'),
  });

  win.loadURL(
    url.format({
      pathname: path.join(
        __dirname,
        '../../frontend/angular/dist/casper/index.html'
      ),
      protocol: 'file:',
      slashes: true,
    })
  );
}

app.on('ready', () => {
  const wsServerPath = path.resolve(__dirname, '../ws-proxy.js');
  const wsProxyProcess = fork(wsServerPath);

  // wsProxyProcess.on('message', (msg) => {
  //   console.log('Message from ws-proxy:', msg);
  // });

  wsProxyProcess.on('exit', (code) => {
    console.log(`WebSocket server exited with code ${code}`);
  });

  createWindow();
});
