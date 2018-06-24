import { mat4 } from "gl-matrix";
import GLShader from "./GLShader";
import GLTexture from "./GLTexture";
import GLMesh from "./GLMesh";

export default class GLRasterizer {

	private _gl: WebGL2RenderingContext; 

	private _quadMesh: GLMesh;

	private _defaultShader: GLShader;

	private _currentShader: GLShader;
	constructor(gl: WebGL2RenderingContext, defaultShader: GLShader) {
		this._gl = gl;

		this._quadMesh = new GLMesh(gl, new Float32Array([
			// x , y,  z,  u, v
			-.50, -.50, 0, 0, 0,
			+.50, -.50, 0, 1, 0,
			-.50, +.50, 0, 0, 1,
			+.50, +.50, 0, 1, 1,	
		]), 4, gl.TRIANGLE_STRIP);

		this._defaultShader = defaultShader;
		this._currentShader = this._defaultShader;

		this._currentShader.use();
	}

	public setShader(shader: GLShader) {
		this._currentShader = shader;
	}

	public drawQuad(matrix: mat4, texture: GLTexture) {
		this._currentShader.setMatrix(matrix);
		this._currentShader.setTexture(texture);
		this._quadMesh.drawCall();
	}

	public drawMesh(mesh: GLMesh, matrix: mat4, texture: GLTexture) {
		this._currentShader.setMatrix(matrix);
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

}