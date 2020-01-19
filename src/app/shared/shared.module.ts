import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Use noopAnimation because browserAnimation cause error with some material component animation
// See here for a possible but instable solution:
// https://github.com/angular/material2/issues/10748#issuecomment-387964691
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxElectronModule } from 'ngx-electron';

@NgModule({
    entryComponents: [
    ],
    declarations: [
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        HttpClientJsonpModule,
        // NoopAnimationsModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NgxElectronModule
    ],
    exports: [
        CommonModule,
        // NoopAnimationsModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NgxElectronModule
    ],
    providers: [],
})
export class SharedModule {}
