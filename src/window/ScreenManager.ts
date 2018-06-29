import { SlaveWindow } from "./SlaveWindow";
import Shader from "../resources/Shader";

export class ScreenManager {

	private _slave: SlaveWindow | null = null;

	private _defaultShader: Shader;

	constructor(defaultShader: Shader) {
		this._defaultShader = defaultShader;
	}

	public async init(): Promise<void> {
		this._slave = await this._openWindow();
	}

	private _openWindow(): Promise<SlaveWindow> {
		return new Promise((resolve) => {
			const newWindow = window.open("other.html") as Window;
			newWindow.addEventListener("load", () => {
				resolve(new SlaveWindow(newWindow, this._defaultShader));
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