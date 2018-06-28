import ModuleLoader from "../modules/ModuleLoader";
import Module from "../modules/Module";
import Stage from "../renderer/Stage";
import GLRasterizer from "../gl/GLRasterizer";
import ShaderLoader from "../loading/ShaderLoader";
import TestModule3DLoader from "../modules/TestModule3DLoader";
import LocalPeerConnection from "../rtc/LocalPeerConnection";



export default class RendererWindow {

	private _stage!: Stage;

	private _canvas!: HTMLCanvasElement;
	private _canvas2!: HTMLCanvasElement;

	private _rasterizer!: GLRasterizer;

	private _module!: Module;

	private _timestamp: number = 0;

	private _gl!: WebGL2RenderingContext;

	private _ctx!: CanvasRenderingContext2D;
	constructor() {


		
	}



	public async load() {
		this._canvas = this._createCanvas();
		//await LocalPeerConnection.createConnection(this._canvas);

		this._openWindow();

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
		//this._openWindow();
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
		document.body.appendChild(canvas);
		return canvas;
	}

	private _render() {
		const timestamp = Date.now();
		const deltaTime = (timestamp - this._timestamp) / 1000;
		this._resize(this._canvas);
		this._module.update(deltaTime);
		
		this._stage.render();
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

		this._stage.setSize(canvas.width, canvas.height);
	}


	private _openWindow() {
		const w = window.open("other.html") as Window;
		w.addEventListener("load", () => {
			console.log("LOADED");
			//const v = w.document.getElementById("video") as HTMLVideoElement;
			this._canvas2 = w.document.getElementById("canvas") as HTMLCanvasElement;
			this._ctx = this._canvas2.getContext("2d") as CanvasRenderingContext2D;
			
			//const stream = this._canvas.captureStream(60);
			//v.src = window.URL.createObjectURL(stream);
			//v.play();
		});
	}

}


RendererWindow.main().catch((e) => {
	console.error(e);
});