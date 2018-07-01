import { SlaveCanvas } from "./SlaveCanvas";
import Renderer from "../renderer/Renderer";
import Shader from "../resources/Shader";

export class DisplayWindow {
	private _window: Window;
	private _canvasElement: HTMLCanvasElement;
	private _directMode: boolean = false;
	private _slaveCanvas: SlaveCanvas | null = null;
	private _defaultShader: Shader;
	private _body: HTMLElement;
	constructor(window: Window, canvasElement: HTMLCanvasElement, defaultShader: Shader) {
		this._window = window;
		this._directMode = false;
		this._body = this._window.document.body;
		this._defaultShader = defaultShader;
		this._canvasElement = canvasElement;
		this.updateDirectModeValue();
	}

	public get directMode(): boolean {
		return this._directMode;
	}

	public get canvasElement(): HTMLCanvasElement {
		return this._canvasElement;
	}

	public set canvasElement(value: HTMLCanvasElement) {
		if (value !== this._canvasElement) {
			this._removeCanvasFromBody();
			this._canvasElement = value;
			this.updateDirectModeValue(true);
		}
	}

	public updateDirectModeValue(force: boolean = false) {
		const parent = this._canvasElement.parentElement;
		const newValue = (parent === this._body || parent === null);
		if (this._directMode !== newValue || force) {
			this._directMode = newValue;
			this._forceUpdateDirectMode();
		}
	}

	private _forceUpdateDirectMode() {
		if (this._directMode) {
			if (this._slaveCanvas) {
				this._slaveCanvas.destroy();
				this._slaveCanvas = null;
			}
			if (!this._body.contains(this._canvasElement)) {
				this._body.appendChild(this._canvasElement);
			}
		} else {
			this._removeCanvasFromBody();
			if (!this._slaveCanvas) {
				this._slaveCanvas = new SlaveCanvas(this._window, this._canvasElement, this._defaultShader);
			}
		}
	}

	private _removeCanvasFromBody() {
		if (this._body.contains(this._canvasElement)) {
			this._body.removeChild(this._canvasElement);
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

	public destroy() {
		if (this._slaveCanvas) {
			this._slaveCanvas.destroy();
		}
		this._removeCanvasFromBody();
	}

	
}