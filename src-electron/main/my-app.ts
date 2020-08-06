import { BrowserWindow, Menu, shell } from 'electron';
import path = require('path');
import url = require('url');

import {
    fileMenuTemplate,
    editMenuTemplate,
    devMenuTemplate } from './menu';


export default class MyApp {
    private static _instance: MyApp;

    private static app: Electron.App;
    private static mainWindow: Electron.BrowserWindow;
    private static mainWindowParams = {
        width: 500,
        height: 325,
        minWidth: 500,
        minHeight: 300,
        darkTheme: true,
        backgroundColor: '#3b8d99',
        webPreferences: {
            spellcheck: true,
            nodeIntegration: true,
            /* See electron nodeIntegration security and preload script
            nodeIntegration: false,
            sandbox: true,
            contextIsolation: true,
            preload: path.resolve(__dirname, '..', 'preload.js')
            */
        }
    };

    private static electronPath = path.resolve(__dirname, '..', '..', 'node_modules', '.bin', 'electron');
    private static appUrlDev = 'http://localhost:4200';
    private static appUrlProd = url.format({
        pathname: path.resolve(__dirname, '..', 'renderer', 'index.html'),
        protocol: 'file:',
        slashes: true,
    });

    private constructor() {
        MyApp._instance = new MyApp();
    }

    public static getInstance(): MyApp {
        return this._instance || (this._instance = new this());
    }

    public static startApp(app: Electron.App) {
        this.app = app;
        this.initAppListener();
    }

    private static createMainWindow() {
        if (this.isDev()) {
            this.createMainWindowDev();
        } else {
            this.createMainWindowProd();
        }
    }

    private static createMainWindowProd() {
        this.mainWindow = new BrowserWindow(this.mainWindowParams);
        this.mainWindow.loadURL(this.appUrlProd);
        this.mainWindow.on('closed', () => this.mainWindow = null);
        this.mainWindow.once('ready-to-show', () => this.mainWindow.show());

        // Build menus
        const devMenu = devMenuTemplate;
        devMenu.submenu = devMenu.submenu.filter((item) => {
            return item.label !== 'Reload';
        });
        const menus: Array<any> = [fileMenuTemplate, editMenuTemplate, devMenuTemplate];
        Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
    }

    private static createMainWindowDev() {
        this.mainWindow = new BrowserWindow(this.mainWindowParams);
        // require('devtron').install();
        require('electron-reload')(__dirname, {
            electron: this.electronPath,
            hardResetMethod: 'exit'
        });
        require('electron-context-menu')({
            showServices: true,
            prepend: (defaultActions: any, params: any, browserWindow: any) => {
                /*
                console.log('defaultActions', defaultActions);
                console.log('params', params);
                */
                return [
                {
                    label: 'Rainbow',
                    visible: params.mediaType === 'image'
                },
                {
                    label: 'Search Google for “{selection}”',
                    // Only show it when right-clicking text

                    visible: params && params.selectionText.trim().length > 0,
                    click: () => {
                        shell.openExternal(`https://google.com/search?q=${encodeURIComponent(params.selectionText)}`);
                    }
                }
            ]}
        });
        this.mainWindow.loadURL(this.appUrlDev);
        this.mainWindow.on('closed', () => this.mainWindow = null);
        this.mainWindow.once('ready-to-show', () => this.mainWindow.show());
        this.mainWindow.webContents.openDevTools();

        // Build menus
        const menus: Array<any> = [fileMenuTemplate, editMenuTemplate, devMenuTemplate];
        Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
    }

    // Init Electron Events
    private static initAppListener() {
        this.app.on('ready', this.onReady.bind(this));
        this.app.on('window-all-closed', this.onWindowAllClosed.bind(this));
        this.app.on('activate', this.onActivate.bind(this));
        this.app.on('before-quit', this.onBeforeQuit.bind(this));
        process.on('uncaughtException', this.errorHandler.bind(this));
    }

    // On app ready
    private static onReady() {
        this.createMainWindow();
        // initHandleYoutubeRequest();
    }

    // On window close
    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            this.app.quit();
        }
    }

    // On activate window (Recreate window when icon is clicked)
    private static onActivate() {
        if (this.mainWindow === null) {
            this.createMainWindow();
        }
    }

    // Clear cache and cookie session before quit
    private static onBeforeQuit() {
        if (!this.isDev()) {
            this.mainWindow.webContents.session
                .clearAuthCache({ type: 'password' })
                .then(() => {
                    this.log('clearAuthCache');
                });

            this.mainWindow.webContents.session
                .clearCache()
                .then(() => {
                    this.log('clearCache');
                });

            this.mainWindow.webContents.session
                .clearStorageData({})
                .then(() => {
                    this.log('clearStorageData');
                });
        }
    }

    private static errorHandler(error) {
        console.error('Uncaught Exception', error);
        const msg: any = {
            /*type : "error",
            title : "Uncaught Exception",
            buttons:["ok", "close"],*/
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

        this.mainWindow.webContents.send('onElectronError', msg);
    }

    private static isDev() {
        let isDevEnv = false;
        const electronEnv = process.env.ELECTRON_ENV || '';
        const nodeEnv = process.env.NODE_ENV || '';
        if (electronEnv.indexOf('dev') !== -1 || nodeEnv.indexOf('dev') !== -1) {
            isDevEnv = true;
        }

        if (!!this.app.isPackaged) {
            isDevEnv = false;
        }

        return isDevEnv;
    }

    private static log(msg, ...args) {
        console.log('[MyApp] ' + msg);
        if (args.length > 0) {
            console.dir(args);
        }
    }
}
