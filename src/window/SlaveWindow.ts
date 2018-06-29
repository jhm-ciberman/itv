import GLRasterizer from "../renderer/gl/GLRasterizer";
import Shader from "../resources/Shader";
import GLTexture from "../renderer/gl/GLTexture";
import { mat4 } from "gl-matrix";

export class SlaveWindow {

	private _canvas: HTMLCanvasElement;
	//private _ctx: CanvasRenderingContext2D;
	private _rasterizer: GLRasterizer;
	private _texture!: GLTexture;
	private _gl: WebGL2RenderingContext;

	constructor(window: Window, defaultShader: Shader) {
		this._canvas = window.document.getElementById("canvas") as HTMLCanvasElement;
		//this._ctx = this._canvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D;
		this._gl = this._canvas.getContext("webgl2", {alpha: false}) as WebGL2RenderingContext;
		this._rasterizer = new GLRasterizer(this._gl, defaultShader)
		const mat = mat4.create();
		mat4.scale(mat, mat, [2, 2, 1]);
		this._rasterizer.setMatrix(mat);
		this._texture = this._rasterizer.createTexture(this._canvas)
	}

	public showCanvas(canvas: HTMLCanvasElement) {
		//this._texture = this._texture || ;
		this._rasterizer.beginFrame();
		this._texture.updateTexture(canvas);
		this._rasterizer.drawQuad(this._texture)
		//this._ctx.drawImage(canvas, 0, 0);
	}

	public destroy() {
		this._texture.free();
		this._gl.finish();
	}

	public resize(width: number, height: number) {
		this._canvas.width = width;
		this._canvas.height = height;
	}
}