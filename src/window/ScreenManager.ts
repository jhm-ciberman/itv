import { SlaveWindow } from "./SlaveWindow";

export class ScreenManager {

	private _slave: SlaveWindow | null = null;

	public async init(): Promise<void> {
		this._slave = await this._openWindow();
	}

	private _openWindow(): Promise<SlaveWindow> {
		return new Promise((resolve) => {
			const newWindow = window.open("other.html") as Window;
			newWindow.addEventListener("load", () => {
				resolve(new SlaveWindow(newWindow));
			});
		});
	}

	public showCanvas(canvas: HTMLCanvasElement) {
		if (this._slave) {
			this._slave.showCanvas(canvas);
		}
	}

	public resize(width: number, height: number) {
		if (this._slave) {
			this._slave.resize(width, height);
		}
	}
}