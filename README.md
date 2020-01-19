# Elegular

## Description:
A preconfigured Electron + Angular boilerplate with hot reload and others...

#### built with:

- [electron](https://electron.atom.io/)
- [electron builder](https://github.com/electron-userland/electron-builder/) 
- [electron-reload](https://github.com/yan-foto/electron-reload#readme)
- [electron-context-menu](https://github.com/sindresorhus/electron-context-menu)
- [angular 8](https://angular.io/)
- [ngx-electron](https://github.com/ThorstenHans/ngx-electron)
- [Reset CSS (By Eric meyer)](http://meyerweb.com/eric/tools/css/reset/)

#### Project structure:
```bash
/elegular
  ├── build # Electron assets files (desktop icons etc...)
  ├── dist # Build output folder
  ├── release # Release output folder (build executable)
  ├── e2e
  ├── src # Angular source code
  ├── src-electron # Electron source code
  ├── .editorconfig
  ├── .gitignore
  ├── angular.json
  ├── package-lock.json
  ├── LICENCE.md
  ├── package.json
  ├── README.md
  ├── electron-builder.yml # electron-builder configuration
  ├── tsconfig.json
  └── tslint.json
```

## Getting Started:

#### Prerequisites:
For run this project, you need to install the following:  
- [Nodejs](https://nodejs.org) >= 10   

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


## License

[MIT](LICENCE.md)
