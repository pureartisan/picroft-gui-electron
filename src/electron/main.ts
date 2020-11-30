import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

import { IS_PI } from '@electron/utils/device';

let mainWindow: Electron.BrowserWindow | null;

const WINDOW_WIDTH = 1024;
const WINDOW_HEIGHT = 600;

const DEV_MODE = process.env.NODE_ENV === 'development';

function createWindow() {

  mainWindow = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    show: false, // hide by default (until we are ready)
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  });

  let entryUrl: string;

  if (DEV_MODE) {
    entryUrl = 'http://localhost:4000';
    mainWindow.webContents.openDevTools();
  } else {
    entryUrl = url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    });
  }

  mainWindow.loadURL(entryUrl);

  // load the main app logic
  require('./app');

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    if (!mainWindow) {
      return;
    }

    // only make the app go full screen on the Rpi
    if (IS_PI) {
      mainWindow.setFullScreen(true);
    }
    mainWindow.setMenuBarVisibility(false);
    mainWindow.show();

    // Open the DevTools automatically if developing
    if (DEV_MODE) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;
