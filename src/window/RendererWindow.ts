import ModuleLoader from "../modules/ModuleLoader";
import Module from "../modules/Module";
import TestModule3DLoader from "../modules/TestModule3DLoader";
import ShaderLoader from "../resources/ShaderLoader";
import Shader from "../resources/Shader";
import { ScreenManager } from "./ScreenManager";
import Scene from "../nodes/Scene";

export default class RendererWindow {


	private _screenManager: ScreenManager;
	private _timestamp: number = 0;
	private _module!: Module;
	
	private _scene: Scene;

	constructor(defaultShader: Shader) {
		this._scene = new Scene();
		this._screenManager = new ScreenManager(this._scene, defaultShader);
	}

	public async load() {
		const moduleLoader: ModuleLoader = new TestModule3DLoader();
		this._module = await moduleLoader.load(this._screenManager.viewport);
		await this._screenManager.init();
	}

	public start() {
		//this._openWindow();
		this._timestamp = Date.now();
		this._render();
	}

	public static async main(): Promise<void> {
		const shaderLoader = new ShaderLoader();
		const defaultShader = await shaderLoader.load("standard.glsl");
		const window = new RendererWindow(defaultShader);
		await window.load();
		window.start();
	}

	private _render() {
		const timestamp = Date.now();
		const deltaTime = (timestamp - this._timestamp) / 1000;
		this._module.update(deltaTime);
		this._screenManager.renderAll();
		this._timestamp = timestamp;
		window.requestAnimationFrame(() => this._render());
	}


}


RendererWindow.main().catch((e) => {
	console.error(e);
});