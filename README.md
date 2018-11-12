# Elegular

> Electron + angular boilerplate

## prerequisites:
For run this project, you need to install the following:  
	- [Nodejs](https://nodejs.org) >= 8.9   
	- [Angular CLI](https://cli.angular.io) >= 7.0.0 

## Getting Started:

##### Clone repositorie and install dependencies:
```
git clone --depth 1 https://github.com/radiium/elegular
cd elegular
npm install
```

##### Run the app:


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


## Made with

- [angular 7](https://angular.io/) and [angular-cli](https://cli.angular.io)
- [angular material](https://material.angular.io/)
- [electron](https://electron.atom.io/), [electron builder](https://github.com/electron-userland/electron-builder/) and [ngx-electron](https://github.com/ThorstenHans/ngx-electron)
- [RxJS](http://reactivex.io/rxjs/)
- [material design icons](https://materialdesignicons.com/)

## License

[MIT](LICENCE.md)
