// Setup default environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log(`Electron launching with NODE_ENV: ${process.env.NODE_ENV}`);


// Import dependencies
import { app, BrowserWindow, ipcMain, ipcRenderer, Menu, shell, dialog, session } from 'electron';
import contextMenu = require('electron-context-menu');
import storage = require('electron-json-storage');
import path = require('path');
import url = require('url');

import { devMenuTemplate } from './menu/dev_menu.template';
import { fileMenuTemplate } from './menu/file_menu.template';
import { editMenuTemplate } from './menu/edit_menu.template';


// Init variable
let mainWindow: any = null;
const menus: any[] = [];
const isDev = process.env.NODE_ENV === 'development' ? true : false;


// Init context menu
if (isDev) {
    contextMenu({
        prepend: (params, browserWindow) => []
    });
}


// Create main window
const createMainWindow = async () => {

    // Initialize main window
    mainWindow = new BrowserWindow({
        width: 1080,
        height: 620,
        minWidth: 1080,
        minHeight: 620,
        // frame: false,
        titleBarStyle: 'customButtonsOnHover',
        backgroundColor: '#3D444C',
        darkTheme: true,
        vibrancy: 'dark',
        webPreferences: {
            nodeIntegration: true,
            // contextIsolation: true,
            // experimentalFeatures: true // For prevent angular/animation error
        }
    });

    // DEV mode => Load app with live reload
    if (isDev) {
        require('electron-reload')(__dirname, {
            electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
            hardResetMethod: 'exit'
        });
        mainWindow.loadURL('http://localhost:4200');
        mainWindow.webContents.openDevTools();

    // PROD mode => Load app
    } else {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true,
        }));
    }

    mainWindow.on('closed', () => mainWindow = null);
    mainWindow.once('ready-to-show', () => mainWindow.show());


    // Build menus
    menus.push(fileMenuTemplate);
    menus.push(editMenuTemplate);
    if (isDev) {
        menus.push(devMenuTemplate);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
    // console.log('Data path:', storage.getDataPath());
};



// On app is ready
app.on('ready', () => {
    createMainWindow();
    // initHandleToutubeRequest();
});

// On close app event
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Recreate window when icon is clicked
app.on('activate', () => {
    if (mainWindow === null) {
        createMainWindow();
    }
});

// Clear cahe and cookie session before quit
app.on('before-quit', () => {
    if (process.env.NODE_ENV !== 'development') {
        mainWindow.webContents.session.clearStorageData();
    }
});


// ----------------------------------------------------------------------------
// App state management
const appStateDataName = 'app-state';
const saveAppState = 'saveAppState';
const getAppState = 'getAppState';
const getAppStateResp = 'getAppStateResp';


ipcMain.on(saveAppState, (event, data) => {
    storage.set(appStateDataName, data, (error) => {
        handleError(error, event.sender, data);
    });
});


ipcMain.on(getAppState, (event, arg) => {
    storage.get(appStateDataName, (error, data) => {
        handleError(error, event.sender, data);
        event.sender.send(getAppStateResp, data);
    });
});


// ----------------------------------------------------------------------------
// Handle request and set header => Referer
/*
const initHandleToutubeRequest = () => {
    // Add youtube url as referer url for play video with restricted domain
    const filters = [
        'https://*.youtube.com/*',
        'http://*.youtube.com/*'
    ];
    session.defaultSession.webRequest.onBeforeSendHeaders({urls: filters}, (details, callback) => {
        details.requestHeaders['Referer'] = 'https://www.youtube.com';
        callback({cancel: false, requestHeaders: details.requestHeaders});
    });
};
*/

// ----------------------------------------------------------------------------
// Errors handlers
const handleError = (error, sender, data?) => {
    // ipcRenderer.send('onElectronError', error);
    if (error) {
        const errorResp = {
            error: error,
            customData: data
        };
        sender.send('onElectronError', errorResp);
        throw error;
    }
};

const errorHandler = function(error) {
    const msg: any = {
        type : 'error',
        title : 'Uncaught Exception',
        buttons: ['ok', 'close'],
        width : 400
    };

    switch (typeof error) {
        case 'object':
            msg.title = 'Uncaught Exception: ' + error.code;
            msg.message = error.message;
            break;
        case 'string':
            msg.message = error;
            break;
    }

    msg.detail = 'Please check the console log for more details.';
    mainWindow.send('onElectronError', msg);
};

process.on('uncaughtException', errorHandler);
