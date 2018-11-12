# Elegular

## Description:
A preconfigured Electron + Angular boilerplate with typescript, sass and hot reload.
Inspired from: [github.com/maximegris/angular-electron/](https://github.com/maximegris/angular-electron/)

#### built with:

- [electron](https://electron.atom.io/), [electron builder](https://github.com/electron-userland/electron-builder/) and [ngx-electron](https://github.com/ThorstenHans/ngx-electron)
- [angular 7](https://angular.io/) and [angular-cli](https://cli.angular.io)
- [angular material](https://material.angular.io/) and [material design icons](https://materialdesignicons.com/)

- [RxJS](http://reactivex.io/rxjs/)
- [Reset CSS (By Eric meyer)](    http://meyerweb.com/eric/tools/css/reset/)

#### Project structure:
```bash
/elegular
  ├── LICENCE.md
  ├── README.md
  ├── angular.json
  ├── build # Electron assets files (desktop icons etc...)
  ├── dist # Electron and Angular build output
  ├── e2e
  ├── electron-builder.yml # electron-builder configuration
  ├── extra-webpack.config.js # Extra webpack config (custom angular cli build)
  ├── package-lock.json
  ├── package.json
  ├── release # electron-builder output folder 
  ├── src # Angular app source code
  ├── src-electron # Electron backend source code
  ├── tsconfig.json
  └── tslint.json
```

## Getting Started:

#### Prerequisites:
For run this project, you need to install the following:  
- [Nodejs](https://nodejs.org) >= 8.9   
- [Angular CLI](https://cli.angular.io) >= 7.0.0  


#### Clone repository and install dependencies:
```
git clone --depth 1 https://github.com/radiium/elegular
cd elegular
npm install
```


#### Available commands:

| Command | Description |
|---------|-------------|
| `npm run start` | Start app in dev mode with hot-reload  |
| `npm run start:prod` | Start app in electron with prod mode |
| `npm run start:web` | Start app in browser at http://localhost:4200 (without electron) |
| `npm run release` | Build and release for the current target |
| `npm run release -- -linux` | Build and release for Linux target |
| `npm run release -- --mac` | Build and release for Mac target |
| `npm run release -- -win` | Build and release for Windows  target|
| `npm run release:all` | Build and release for all platform target (linux/mac/windows) |


## Access native node modules in angular:

You can acces to the native node modules inside angular:
1. Import the module with ```require([module name])``` inside [./extra-webpack.config.js](./extra-webpack.config.js)
2. Then use it in angular with ```window.require([module name]);```

**Important:** This is an experimental feature! 
For more information, see:
- Article: [customizing-angular-cli](https://codeburst.io/customizing-angular-cli-6-build-an-alternative-to-ng-eject-a48304cd3b21)
- Package: [@angular-builders/custom-webpack](https://github.com/meltedspark/angular-builders/tree/master/packages/custom-webpack)

## Angular Material
See doc and available Angular components: [https://material.angular.io/](https://material.angular.io/)



## Material design icons
See list of available icons: [https://materialdesignicons.com/](https://materialdesignicons.com/)

Usage:
```html
<mat-icon svgIcon="angular"></mat-icon>
```



## License

[MIT](LICENCE.md)
