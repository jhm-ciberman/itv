import Shader from "../resources/Shader";
import {screen as electronScreen} from "electron";
import Viewport from "./Viewport";
import Renderer from "../renderer/Renderer";
import Scene from "../nodes/Scene";
import { DisplayWindow } from "./DisplayWindow";

export class ScreenManager {

	private _renderer: Renderer;
	private _viewport: Viewport;
	private _displayWindow: DisplayWindow;

	constructor(scene: Scene, defaultShader: Shader) {
		this._renderer = new Renderer(800, 600, defaultShader);
		this._viewport = new Viewport(800, 600, scene);
		this._renderer.addViewport(this._viewport);
		
		this._displayWindow = new DisplayWindow(window, this._renderer.canvasElement, defaultShader);
		console.log(this._displayWindow.directMode);
		//const displays = electronScreen.getAllDisplays();
		//console.log(displays);
	}

	public renderAll() {
		this._resize();
		this._renderer.render();
		this._displayWindow.update();
	}

	public get viewport(): Viewport {
		return this._viewport;
	}

	public async init(): Promise<void> {
		//await this._openWindow();
	}

	private _resize() {
		const w = window.innerWidth;
		const h = window.innerHeight;
		if (this._renderer.canvasElement.width !== w 
			|| this._renderer.canvasElement.height !== h) {

			this._renderer.resize(w, h)
			this._viewport.setSize(w, h);
			this._displayWindow.resize(w, h);
		}
	}

}