import ShaderLoader from "./loading/ShaderLoader";
import GLTexture from "./gl/GLTexture";
import Material from "./renderer/Material";
import WorldRenderer from "./renderer/WorldRenderer";
import MeshRenderer from "./nodes/MeshRenderer";
import Quad from "./renderer/mesh/Quad";
import GLShaderProgram from "./gl/GLShaderProgram";
import Cube from "./renderer/mesh/Cube";

export default class RendererWindow {

	private _worldRenderer!: WorldRenderer;

	private _canvas!: HTMLCanvasElement;

	public async init() {
		this._canvas = this._createCanvas();
		const gl = this._canvas.getContext("webgl2") as WebGL2RenderingContext;
		const shaderLoader = new ShaderLoader(gl);
		const shader = await shaderLoader.load("./res/vertex.glsl", "./res/fragment.glsl");
		const image = await this._loadImage("../res/sonny.jpg")
		const rootNode = this._loadScene(gl, image, shader);
		this._worldRenderer = new WorldRenderer(gl, rootNode);
		this._render();
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

	private _render() {
		this._resize(this._canvas);
		this._worldRenderer.render();
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

	private _loadScene(gl: WebGL2RenderingContext, image: HTMLImageElement, shader: GLShaderProgram) {
		const quad = new Cube(gl);
		const material = new Material(shader);
		material.texture = new GLTexture(gl, image);
		const node = new MeshRenderer(gl, quad, material);
		return node;
	}


}