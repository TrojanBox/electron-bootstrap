/// <reference path="../../typings/tsd.d.ts" />

import * as Electron from 'electron';
import * as path from 'path';
import * as appConfig from './app-config';

let window:any;

var createWindow = () => {
    window = new Electron.BrowserWindow({
        width: 1400,
        height: 800,
        title: 'Hello World'
    });
    window.loadURL(`file://${path.join(appConfig.APP_TEMPLATE_PATH, '/index.html')}`);
    // window.webContents.openDevTools();
    window.on('closed', () => {
        window = null;
    });
};

Electron.app.on('ready', createWindow);

Electron.app.on('window-all-closed', () => {
    if (process.platform !== 'drawin') {
        Electron.app.quit();
    }
});

Electron.app.on('activate', () => {
    if (window == null) {
        createWindow();
    }
});