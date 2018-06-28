import { app, BrowserWindow, ipcMain } from 'electron';
import * as url from "url";
import * as path from "path";

export default class App {
	private _mainWindow: BrowserWindow | null = null;
	private _otherWindow: BrowserWindow | null = null;

	constructor() {
		app.on('ready', () => {
			this._createMainWindow();
		})
		app.on('activate', () => {
			this._createMainWindow();
		})
		app.on('window-all-closed', () => {
			if (process.platform !== 'darwin') {
				app.quit()
			}
		})

	}

	private _createMainWindow(): void {
		if (this._mainWindow === null) {
			this._mainWindow = this._newWindow("index.html");
			this._mainWindow.show();
			this._mainWindow.on("closed", () => {
				this._mainWindow = null;
			});
			this._mainWindow.webContents.on('new-window', (event: Event, _url, frameName, _disposition, options, _additionalFeatures) => {
				if (frameName === 'modal') {
					// open window as modal
					event.preventDefault()
					Object.assign(options, {
						modal: true,
						parent: this._mainWindow,
						width: 100,
						height: 100
					})
					(event as any).newGuest = new BrowserWindow(options)
				}
			})
		}
		/*
		if (this._otherWindow === null) {
			this._otherWindow = this._newWindow("other.html");
			this._otherWindow.setKiosk(true);
			this._otherWindow.show();
			this._otherWindow.webContents.toggleDevTools();
			this._otherWindow.on("closed", () => {
				this._otherWindow = null;
			});
			
		}*/

		ipcMain.on("answer", (_e: Event, spd: any) => {
			console.log("answer " + spd);
			if (this._mainWindow) {
				this._mainWindow.webContents.send("answer", spd);
			}
		});
		ipcMain.on("offer", (_e: Event, spd: any) => {
			console.log("APP " + spd);
			if (this._otherWindow) {
				this._otherWindow.webContents.send("offer", spd);
			}
		});
	}


	private _newWindow(urlPath: string): BrowserWindow {
		const win = new BrowserWindow({
			width: 800,
			height: 600,
			show: false,
			webPreferences: {
				nativeWindowOpen: true,
				webSecurity: false,
			}
		});

		const str = url.format({
			pathname: path.resolve(__dirname, '../../res/', urlPath),
			protocol: 'file:',
			slashes: true,
		});
		win.loadURL(str);
		//win.show();
		win.once('ready-to-show', () => {
			//win.show();
		});
		win.webContents.on("console-message", (_level: number, _message: string, line: number, _sourceId: string) => {

			console.log(line); // its message! The typings.d.ts is bad! 
		});

		return win;
	}

}

// Init app
new App();

