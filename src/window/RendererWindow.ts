import Stage3D from "../renderer/Stage3D";
import TestModuleLoader from "../modules/TestModuleLoader";
import ModuleLoader from "../modules/ModuleLoader";
import Module from "../modules/Module";

export default class RendererWindow {

	private _stage: Stage3D;

	private _canvas: HTMLCanvasElement;

	private _module!: Module;

	private _timestamp: number = 0;

	private _gl: WebGL2RenderingContext;

	constructor() {
		this._canvas = document.createElement("canvas");
		this._canvas.width = 480;
		this._canvas.height = 320;
		document.body.appendChild(this._canvas);
		this._gl = this._canvas.getContext("webgl2") as WebGL2RenderingContext;
		this._stage = new Stage3D(this._gl);
	}

	public async load() {
		const moduleLoader: ModuleLoader = new TestModuleLoader(this._gl, this._stage);
		this._module = await moduleLoader.load(this._gl, this._stage);
	}

	public start() {
		this._timestamp = Date.now();
		this._render(this._timestamp);
	}

	public static async main(): Promise<void> {
		const window = new RendererWindow();
		await window.load();
		window.start();
	}



	private _render(timestamp: number) {
		const deltaTime = (timestamp - this._timestamp) / 1000;
		this._resize(this._canvas);
		this._module.update(deltaTime);
		this._stage.render();
		this._timestamp = timestamp;
		window.requestAnimationFrame(this._render.bind(this));
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
		}
	}

}


RendererWindow.main().catch((e) => {
	console.error(e);
});