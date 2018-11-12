import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable()
export class AppStateService {

    isElectronApp: boolean;
    isFirstLoad: boolean;

    constructor(
    private electronSrv: ElectronService) {
        this.isElectronApp = this.electronSrv.isElectronApp;
        this.isFirstLoad = true;
    }

    initAppData() {
        console.log('Load app data');
        if (this.isElectronApp) {
            this.loadAppState();
            setTimeout(() => this.isFirstLoad = false, 2000);

        } else {
            this.insertFakeData();
        }
    }

    saveAppState() {
        // console.log('===== saveAppState');
        if (this.isElectronApp && !this.isFirstLoad) {
            this.electronSrv.ipcRenderer.send('saveAppState', JSON.stringify({ appState: 'Elegular' }));
        }
    }

    loadAppState() {
        this.electronSrv.ipcRenderer.send('getAppState');
        this.electronSrv.ipcRenderer.on('getAppStateResponse', (event, data) => {
            if (data) {
                // TODO
            }
        });
    }

    insertFakeData() {
    }

}
