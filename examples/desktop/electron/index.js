const { app, BrowserWindow, Menu } = require("electron");
const url = require("url");
const path = require("path");
const { fork } = require("child_process");

let win;
/** @type {import('child_process').ChildProcess | null} */
let wsProxyProcess = null;

function angularIndexPath() {
  return path.join(__dirname, "../../frontend/angular/dist/casper/index.html");
}

/** @param {string | undefined} hashRoute Route without leading # (e.g. health). */
function angularIndexUrl(hashRoute) {
  const base = url.format({
    pathname: angularIndexPath(),
    protocol: "file:",
    slashes: true,
  });
  if (!hashRoute) {
    return base;
  }
  const normalized = hashRoute.replace(/^\//, "");
  return `${base}#/${normalized}`;
}

/**
 * @param {string} rawUrl
 * @returns {string | undefined}
 */
function hashRouteFromUrl(rawUrl) {
  const hashIndex = rawUrl.indexOf("#");
  if (hashIndex < 0) {
    return undefined;
  }
  const hash = rawUrl.slice(hashIndex + 1).replace(/^\/?/, "");
  return hash || undefined;
}

/**
 * Reload must re-load index.html (not webContents.reload).
 * PathLocation / broken file:// URLs otherwise land on file:/// and lose assets.
 * @param {import('electron').BrowserWindow} browserWindow
 * @param {boolean} ignoreCache
 */
async function reloadAppWindow(browserWindow, ignoreCache) {
  if (!browserWindow || browserWindow.isDestroyed()) {
    return;
  }
  const hashRoute = hashRouteFromUrl(browserWindow.webContents.getURL());
  const target = angularIndexUrl(hashRoute);
  if (ignoreCache) {
    await browserWindow.webContents.session.clearCache();
  }
  await browserWindow.loadURL(target);
}

/** @param {boolean} ignoreCache */
function reloadFocusedAppWindow(ignoreCache) {
  const target = BrowserWindow.getFocusedWindow() || win;
  if (!target || target.isDestroyed()) {
    return;
  }
  reloadAppWindow(target, ignoreCache).catch((err) => {
    console.error("[reload]", err instanceof Error ? err.message : err);
  });
}

function buildApplicationMenu() {
  /** @type {import('electron').MenuItemConstructorOptions[]} */
  const template = [
    ...(process.platform === "darwin" ? [{ role: "appMenu" }] : []),
    { role: "fileMenu" },
    { role: "editMenu" },
    {
      label: "View",
      submenu: [
        {
          label: "Reload",
          accelerator: "CmdOrCtrl+R",
          click: () => reloadFocusedAppWindow(false),
        },
        {
          label: "Force Reload",
          accelerator: "CmdOrCtrl+Shift+R",
          click: () => reloadFocusedAppWindow(true),
        },
        { type: "separator" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    { role: "windowMenu" },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

function wsProxyPath() {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, "ws-proxy.js");
  }
  return path.resolve(__dirname, "../../frontend/angular/ws-proxy.js");
}

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 728,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
    icon: path.join(__dirname, "favicon.png"),
  });

  win.loadURL(angularIndexUrl());
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (win && !win.isDestroyed()) {
      if (win.isMinimized()) {
        win.restore();
      }
      win.focus();
    }
  });

  app.on("ready", () => {
    buildApplicationMenu();

    const wsServerPath = wsProxyPath();
    wsProxyProcess = fork(wsServerPath);
    wsProxyProcess.on("exit", (code) => {
      console.log(`WebSocket server exited with code ${code}`);
      wsProxyProcess = null;
    });

    createWindow();
  });

  app.on("before-quit", () => {
    if (wsProxyProcess && !wsProxyProcess.killed) {
      wsProxyProcess.kill();
    }
  });
}
