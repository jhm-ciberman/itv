import ShaderLoader from "./loading/ShaderLoader";
import Canvas2D from "./renderer/Canvas2D";
import Quad from "./renderer/Quad";

export default class RendererWindow {

	private _canvas2D!: Canvas2D;

	public async init() {
		const canvas = this._createCanvas();
		this._canvas2D = await this._createCanvas2D(canvas);
		
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

	private async _createCanvas2D(canvas: HTMLCanvasElement) {
		const gl = canvas.getContext("webgl2") as WebGL2RenderingContext; 
		const canvas2D = new Canvas2D(gl);
		const shaderLoader = new ShaderLoader(gl);
		const program = await shaderLoader.load("./res/vertex.glsl", "./res/fragment.glsl");
		const quad = new Quad(gl);
		quad.setShaderProgram(program);
		canvas2D.child = quad;
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