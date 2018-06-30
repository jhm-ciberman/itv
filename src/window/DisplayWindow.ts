import { SlaveCanvas } from "./SlaveCanvas";
import Renderer from "../renderer/Renderer";
import Shader from "../resources/Shader";

export class DisplayWindow {
	private _window: Window;
	private _renderer: Renderer;
	private _directMode: boolean;
	private _slaveCanvas: SlaveCanvas | null = null;
	private _defaultShader: Shader;
	constructor(window: Window, renderer: Renderer, directMode: boolean, defaultShader: Shader) {
		this._window = window;
		this._renderer = renderer;
		this._directMode = false;
		this._defaultShader = defaultShader;
		this._updateDirectModeValue(directMode);
	}

	public get directMode(): boolean {
		return this._directMode;
	}

	public set directMode(value: boolean) {
		if (value !== this._directMode) {
			this._updateDirectModeValue(value);
		}
	}

	private _updateDirectModeValue(value: boolean) {
		this._directMode = value;
		console.log("Direct Mode = " + value);
		if (value) {
			if (this._slaveCanvas) {
				this._slaveCanvas.destroy();
				this._slaveCanvas = null;
			}
			window.document.body.appendChild(this._renderer.canvasElement);
		} else {
			if (window.document.body.contains(this._renderer.canvasElement)) {
				window.document.body.removeChild(this._renderer.canvasElement);
			}
			if (!this._slaveCanvas) {
				this._slaveCanvas = new SlaveCanvas(this._window, this._renderer.canvasElement, this._defaultShader);
			}
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

	
}