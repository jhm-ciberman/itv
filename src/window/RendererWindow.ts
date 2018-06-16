import WorldRenderer from "../renderer/WorldRenderer3D";
import PerspectiveCamera from "../renderer/PerspectiveCamera";
import TestModule from "../TestModule";
import SceneLoader from "../SceneLoader";

export default class RendererWindow {

	private _worldRenderer!: WorldRenderer;

	private _canvas!: HTMLCanvasElement;

	private _camera!: PerspectiveCamera;

	private _module!: TestModule;

	private _timestamp: number = 0;

	constructor() {

	}

	public async init() {
		this._canvas = this._createCanvas();
		const gl = this._canvas.getContext("webgl2") as WebGL2RenderingContext;

		const sceneLoader = new SceneLoader();
		const rootNode = await sceneLoader.load(gl);
		this._module = new TestModule(rootNode);
		this._worldRenderer = new WorldRenderer(gl, rootNode);
		this._camera = sceneLoader.createCamera(gl);
		this._timestamp = Date.now();
		this._render(this._timestamp);
	}



	private _render(timestamp: number) {
		const deltaTime = (timestamp - this._timestamp) / 1000;
		this._resize(this._canvas);
		this._module.update(deltaTime);
		this._worldRenderer.render(this._camera);
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

	private _createCanvas() {
		const canvas = document.createElement("canvas");
		canvas.width = 480;
		canvas.height = 320;
		document.body.appendChild(canvas);
		return canvas;
	}

}