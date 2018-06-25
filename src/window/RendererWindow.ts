import ModuleLoader from "../modules/ModuleLoader";
import Module from "../modules/Module";
import TestModule2DLoader from "../modules/TestModule2DLoader";
import Stage from "../renderer/Stage";
import GLRasterizer from "../gl/GLRasterizer";
import ShaderLoader from "../loading/ShaderLoader";
import * as path from "path";
import TestModule3DLoader from "../modules/TestModule3DLoader";

export default class RendererWindow {

	private _stage!: Stage;

	private _canvas!: HTMLCanvasElement;

	private _rasterizer!: GLRasterizer;

	private _module!: Module;

	private _timestamp: number = 0;

	private _gl!: WebGL2RenderingContext;

	constructor() {


		
	}



	public async load() {
		this._canvas = this._createCanvas();
		this._gl = this._canvas.getContext("webgl2") as WebGL2RenderingContext;
		const shaderLoader = new ShaderLoader(this._gl);
		const defaultShader = await shaderLoader.load("standard.glsl");

		this._rasterizer = new GLRasterizer(this._gl, defaultShader);
		this._rasterizer.init();

		this._stage = new Stage(this._rasterizer, this._gl.canvas.width, this._gl.canvas.height);

		const moduleLoader: ModuleLoader = new TestModule3DLoader();
		this._module = await moduleLoader.load(this._gl, this._stage);
	}

	public start() {
		this._timestamp = Date.now();
		this._render();
	}

	public static async main(): Promise<void> {
		const window = new RendererWindow();
		await window.load();
		window.start();
	}

	private _createCanvas(): HTMLCanvasElement {
		const canvas = document.createElement("canvas");
		canvas.width = 480;
		canvas.height = 320;
		document.body.appendChild(canvas);
		return canvas;
	}

	private _render() {
		const timestamp = Date.now();
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

		this._stage.setSize(canvas.width, canvas.height);
	}

}


RendererWindow.main().catch((e) => {
	console.error(e);
});