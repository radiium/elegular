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
| `npm run start:web` | Start app in browser at http://localhost:4200 (without electron) |
| `npm run start:dev` | Start app in electron |
| `npm run start:prod` | Start app in electron |
| `npm run start:reload` | Start app in electron with hot-reload mode |
| `npm run release -- -l` | Build and release for Linux |
| `npm run release -- -m` | Build and release for Mac |
| `npm run release -- -w` | Build and release for Windows |
| `npm run release:all` | Build and release for all platform (linux/mac/windows) |


## Made with

- [angular 7](https://angular.io/) and [angular-cli](https://cli.angular.io)
- [angular material](https://material.angular.io/)
- [electron](https://electron.atom.io/), [electron builder](https://github.com/electron-userland/electron-builder/) and [ngx-electron](https://github.com/ThorstenHans/ngx-electron)
- [RxJS](http://reactivex.io/rxjs/)
- [material design icons](https://materialdesignicons.com/)

## License

[MIT](LICENCE.md)
