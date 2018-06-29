import ModuleLoader from "../modules/ModuleLoader";
import Module from "../modules/Module";
import Renderer from "../renderer/Renderer";
import TestModule3DLoader from "../modules/TestModule3DLoader";
import ShaderLoader from "../resources/ShaderLoader";
import Shader from "../resources/Shader";
import Viewport from "./Viewport";
import { ScreenManager } from "./ScreenManager";
import OrthographicCamera from "../nodes/projection/OrthographicCamera";
import Vector3 from "../math/Vector3";

export default class RendererWindow {

	private _renderer: Renderer;
	private _screenManager: ScreenManager;
	private _canvas: HTMLCanvasElement;
	private _timestamp: number = 0;
	private _viewports: Viewport[] = [];

	private _module!: Module;

	constructor(defaultShader: Shader) {
		this._canvas = document.createElement("canvas");
		document.body.appendChild(this._canvas);
		this._renderer = new Renderer(this._canvas, defaultShader);

		const cam = new OrthographicCamera(this._canvas.height / 2);
		cam.transform.position = new Vector3(0, 0, -10);
		
		const vp = new Viewport(this._canvas.width, this._canvas.height, cam);
		this._viewports.push(vp);
	

		this._screenManager = new ScreenManager();
	}

	public async load() {
		const moduleLoader: ModuleLoader = new TestModule3DLoader();
		this._module = await moduleLoader.load(this._viewports[0]);
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
		this._resize(this._canvas);
		this._module.update(deltaTime);
		
		this._renderer.render(this._viewports);
		this._screenManager.showCanvas(this._canvas);


		this._timestamp = timestamp;
		window.requestAnimationFrame(() => this._render());
	}

	private _resize(canvas: HTMLCanvasElement) {
		// Lookup the size the browser is displaying the canvas.
		const displayWidth = window.innerWidth;
		const displayHeight = window.innerHeight;

		// Check if the canvas is not the same size.
		if (canvas.width !== displayWidth || canvas.height !== displayHeight) {

			// Make the canvas the same size
			canvas.width = displayWidth;
			canvas.height = displayHeight;

			this._screenManager.resize(canvas.width, canvas.height)
			this._viewports[0].setSize(canvas.width, canvas.height);
		}


	}
}


RendererWindow.main().catch((e) => {
	console.error(e);
});