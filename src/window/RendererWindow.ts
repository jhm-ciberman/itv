import ModuleLoader from "../modules/ModuleLoader";
import Module from "../modules/Module";
import Renderer from "../renderer/Renderer";
import TestModule3DLoader from "../modules/TestModule3DLoader";
import ShaderLoader from "../resources/ShaderLoader";
import Shader from "../resources/Shader";



export default class RendererWindow {

	private _renderer: Renderer;
	private _canvas: HTMLCanvasElement;
	private _timestamp: number = 0;

	private _canvas2!: HTMLCanvasElement;
	private _module!: Module;
	private _ctx!: CanvasRenderingContext2D;

	constructor(defaultShader: Shader) {
		this._canvas = this._createCanvas();
		this._renderer = new Renderer(this._canvas, defaultShader);
		this._openWindow();
	}



	public async load() {
		const moduleLoader: ModuleLoader = new TestModule3DLoader();
		this._module = await moduleLoader.load(this._renderer);
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



	private _createCanvas(): HTMLCanvasElement {
		const canvas = document.createElement("canvas");
		document.body.appendChild(canvas);
		return canvas;
	}

	private _render() {
		const timestamp = Date.now();
		const deltaTime = (timestamp - this._timestamp) / 1000;
		this._resize(this._canvas);
		this._module.update(deltaTime);
		
		this._renderer.render();
		this._ctx.drawImage(this._canvas, 0, 0);

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

		if (this._canvas2) {
			this._canvas2.width = this._canvas.width;
			this._canvas2.height = this._canvas.height;
		}

		this._renderer.setSize(canvas.width, canvas.height);
	}


	private _openWindow() {
		const w = window.open("other.html") as Window;
		w.addEventListener("load", () => {
			console.log("LOADED");
			//const v = w.document.getElementById("video") as HTMLVideoElement;
			this._canvas2 = w.document.getElementById("canvas") as HTMLCanvasElement;
			this._ctx = this._canvas2.getContext("2d", {alpha: false}) as CanvasRenderingContext2D;
			
			//const stream = this._canvas.captureStream(60);
			//v.src = window.URL.createObjectURL(stream);
			//v.play();
		});
	}

}


RendererWindow.main().catch((e) => {
	console.error(e);
});