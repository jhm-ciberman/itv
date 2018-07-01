import { SlaveCanvas } from "./SlaveCanvas";
import Shader from "../resources/Shader";

export class DisplayWindow {
	private _window: Window | null = null;
	private _body: HTMLElement | null = null;

	private _canvasElement: HTMLCanvasElement;
	private _directMode: boolean = false;
	private _slaveCanvas: SlaveCanvas | null = null;
	private _defaultShader: Shader;

	constructor(canvasElement: HTMLCanvasElement, defaultShader: Shader) {
		this._directMode = false;
		this._defaultShader = defaultShader;
		this._canvasElement = canvasElement;
		this.updateDirectModeValue();
	}

	public get window(): Window | null {
		return this._window;
	}

	public set window(value: Window | null) {
		if (this._window !== value) {
			if (value === null) {
				this._detachWindow();
			} else {
				this._attachWindow(value);
			}
		}
	}

	public get directMode(): boolean {
		return this._directMode;
	}

	public get canvasElement(): HTMLCanvasElement {
		return this._canvasElement;
	}

	public set canvasElement(value: HTMLCanvasElement) {
		if (value !== this._canvasElement) {
			this._removeCanvas();
			this._canvasElement = value;
			this.updateDirectModeValue(true);
		}
	}

	public updateDirectModeValue(force: boolean = false) {
		if (!this._body) {
			return;
		}
		const parent = this._canvasElement.parentElement;
		const newValue = (parent === this._body || parent === null);
		if (this._directMode !== newValue || force) {
			this._directMode = newValue;
			if (this._directMode) {
				this._addCanvas();
				this._destroySlave();
			} else {
				this._removeCanvas();
				this._createSlave();
			}
		}
	}

	private _addCanvas() {
		if (this._body && !this._body.contains(this._canvasElement)) {
			this._body.appendChild(this._canvasElement);
		}
	}

	private _removeCanvas() {
		if (this._body && this._body.contains(this._canvasElement)) {
			this._body.removeChild(this._canvasElement);
		}
	}

	private _destroySlave() {
		if (this._slaveCanvas) {
			this._slaveCanvas.destroy();
			this._slaveCanvas = null;
		}
	}

	private _createSlave() {
		if (!this._slaveCanvas && this._window) {
			this._slaveCanvas = new SlaveCanvas(this._window, this._canvasElement, this._defaultShader);
		}
	}


	public update() {
		if (this._slaveCanvas) {
			this._slaveCanvas.drawCanvas();
		}
	}

	public resize(width: number, height: number) {
		if (this._slaveCanvas) {
			this._slaveCanvas.resize(width, height);
		}
	}

	private _detachWindow() {
		this._destroySlave();
		this._removeCanvas();
		this._window = null;
		this._body = null;
	}

	private _attachWindow(window: Window) {
		this._window = window;
		this._body = this._window.document.body;
		this.updateDirectModeValue(true);
	}

	
}