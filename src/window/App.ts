import { app } from 'electron';
import MainWindow from "./MainWindow";

export default class App {

	private _mainWindow: MainWindow | null = null;

	constructor() {
		app.on('ready', () => {
			this._createMainWindow();
		})
		app.on('window-all-closed', () => {
			if (process.platform !== 'darwin') {
				app.quit()
			}
		})
		app.on('activate', () => {
			if (this._mainWindow === null) {
				this._createMainWindow();
			}
		})
	}

	private _createMainWindow() {
		this._mainWindow = new MainWindow();
		this._mainWindow.on("closed", () => {
			this._mainWindow = null;
		});
	}
}