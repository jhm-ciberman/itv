import ShaderLoader from "./loading/ShaderLoader";
import Canvas2D from "./renderer/Canvas2D";
import MeshRenderer2D from "./renderer/MeshRenderer2D";
import Material from "./renderer/Material";
import GLTexture from "./gl/GLTexture";
import Quad from "./renderer/mesh/Quad";

export default class RendererWindow {

	private _canvas2D!: Canvas2D;

	public async init() {
		const canvas = this._createCanvas();
		const image = await this._loadImage("../res/sonny.jpg")
		this._canvas2D = await this._createCanvas2D(canvas, image);
		
	}

	private async _loadImage(src: string): Promise<HTMLImageElement> {
		return new Promise<HTMLImageElement>((resolve) => {
			const image = new Image();
			image.src = src;  // MUST BE SAME DOMAIN!!!
			image.onload = function () {
				resolve(image);
			}
		});
	}

	public render() {
		this._canvas2D.render();
	}

	private _createCanvas() {
		const canvas = document.createElement("canvas");
		canvas.width = 480;
		canvas.height = 320;
		document.body.appendChild(canvas);
		return canvas;
	}

	private async _createCanvas2D(canvas: HTMLCanvasElement, image:HTMLImageElement) {
		const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
		this._resize(canvas);
		const canvas2D = new Canvas2D(gl);
		const shaderLoader = new ShaderLoader(gl);
		const shader = await shaderLoader.load("./res/vertex.glsl", "./res/fragment.glsl");
		const quad = new Quad(gl);
		const material = new Material(shader);
		material.texture = new GLTexture(gl, image);
		canvas2D.child = new MeshRenderer2D(gl, quad, material);
		canvas2D.material = material;
		return canvas2D;
	}

	private _resize(canvas: HTMLCanvasElement) {
		// Lookup the size the browser is displaying the canvas.
		const displayWidth = canvas.clientWidth;
		const displayHeight = canvas.clientHeight;

		// Check if the canvas is not the same size.
		if (canvas.width !== displayWidth || canvas.height !== displayHeight) {

			// Make the canvas the same size
			canvas.width = displayWidth;
			canvas.height = displayHeight;
		}
	}
}