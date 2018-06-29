import { mat4 } from "gl-matrix";
import GLShader from "./GLShader";
import GLTexture, { GLImageSource } from "./GLTexture";
import GLMesh from "./GLMesh";
import GLIndexedMesh from "./GLIndexedMesh";
import { GLRasterizerDrawMode } from "./GLRasterizerDrawMode";
import Shader from "../../resources/Shader";

export default class GLRasterizer {

	private _gl: WebGL2RenderingContext; 

	private _quadMesh: GLMesh;
	private _fullscreenQuadMesh: GLMesh;

	private _defaultShader: GLShader;

	private _currentShader: GLShader;

	private _drawModes: Array<number> = [];
	constructor(gl: WebGL2RenderingContext, defaultShader: Shader) {
		this._gl = gl;
		this._quadMesh = new GLMesh(gl, new Float32Array([
			// x , y,  z,  u, v
			-.50, -.50, 0, 0, 0,
			+.50, -.50, 0, 1, 0,
			-.50, +.50, 0, 0, 1,
			+.50, +.50, 0, 1, 1,	
		]), 4, gl.TRIANGLE_STRIP);

		this._fullscreenQuadMesh = new GLMesh(gl, new Float32Array([
			// x , y,  z,  u, v
			-1, -1, 0, 0, 0,
			+1, -1, 0, 1, 0,
			-1, +1, 0, 0, 1,
			+1, +1, 0, 1, 1,
		]), 4, gl.TRIANGLE_STRIP);

		this._drawModes[GLRasterizerDrawMode.TRIANGLES] = this._gl.TRIANGLES;
		this._drawModes[GLRasterizerDrawMode.TRIANGLE_STRIP] = this._gl.TRIANGLE_STRIP;
		this._drawModes[GLRasterizerDrawMode.TRIANGLE_FAN] = this._gl.TRIANGLE_FAN;

		this._defaultShader = defaultShader.getRawResource(this);
		this._currentShader = this._defaultShader;

		this._currentShader.use();
	}

	public setShader(shader: GLShader) {
		this._currentShader = shader;
		this._currentShader.use();
	}

	public setMatrix(matrix: mat4) {
		this._currentShader.setMatrix(matrix);
	}

	public drawQuad(texture: GLTexture) {
		this._currentShader.setTexture(texture);
		this._quadMesh.drawCall();
	}

	public drawFullscreenQuad(texture: GLTexture) {
		this._currentShader.setTexture(texture);
		this._fullscreenQuadMesh.drawCall();
	}

	public drawMesh(mesh: GLMesh, texture: GLTexture) {
		this._currentShader.setTexture(texture);
		mesh.drawCall();
	}

	public beginFrame() {
		const gl = this._gl;
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}

	public init() {
		const gl = this._gl;
		gl.disable(gl.CULL_FACE);
		gl.clearColor(0.2, 0.2, 0.2, 1.0);  // Clear to black, fully opaque
		gl.clearDepth(1.0);                 // Clear everything
		gl.enable(gl.DEPTH_TEST);           // Enable depth testing
		gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
	}

	public createTexture(image: GLImageSource) {
		return new GLTexture(this._gl, image);
	}

	public createShader(vertexSource: string, fragmentSource: string) {
		return new GLShader(this._gl, vertexSource, fragmentSource);
	}

	public createMesh(data: Float32Array, vertexCount: number, drawMode: GLRasterizerDrawMode) {
		return new GLMesh(this._gl, data, vertexCount, this._drawModes[drawMode]);
	}

	public createIndexedMesh(data: Float32Array, indices: Uint8Array, drawMode: GLRasterizerDrawMode) {
		return new GLIndexedMesh(this._gl, data, indices, this._drawModes[drawMode]);
	}

}