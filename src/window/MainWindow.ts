import { BrowserWindow } from 'electron';
import { EventEmitter } from "events";
import * as path from 'path';
import * as url from 'url';



export default class MainWindow extends EventEmitter {
	private _win: Electron.BrowserWindow;

	constructor() {
		super();
		this._win = new BrowserWindow({ width: 800, height: 600 , show: false})

		const str = url.format({
			pathname: path.resolve(__dirname, '../../res/index.html'),
			protocol: 'file:',
			slashes: true
		});
		this._win.loadURL(str);
		this._win.once('ready-to-show', () => {
			this._win.show();
		});
		this._win.on('closed', () => {
			console.log("Window closed");
			this.emit('closed');
		});
		this._win.webContents.on("console-message", (_level: number, _message: string, line: number, _sourceId: string) => {
				
			console.log(line); // its message! The typings.d.ts is bad! 
		});
	}
}

